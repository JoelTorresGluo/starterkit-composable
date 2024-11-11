import ConstructorIOClient from '@constructor-io/constructorio-client-javascript'
import { useLocalStorage } from '@oriuminc/base'
import { useEffect, useState } from 'react'

function getSessionId(): number {
  const key = '_constructorio_search_session_id'
  const storedId = window.localStorage.getItem(key)

  const id = storedId ? parseInt(storedId, 10) + 1 : 1

  window.localStorage.setItem(key, id.toString())

  return id
}

// Utility function to generate a UUID
// Better to use a library like uuid, but this is just for example purposes
const generateUUID = () => {
  let d = new Date()
  let d2 = new Date(d.getTime())
  return d2.getTime().toString()
}

export const LOCALE_STORAGE_CONSTRUCTORIO_CLIENT_ID = 'constructorio_client_id'
const HALF_HOUR = 30 * 60 * 1000

export function useCioClient({ userId }: { userId?: string }) {
  const [client, setClient] = useState<ConstructorIOClient | undefined>(
    undefined
  )
  const [cioClientId] = useLocalStorage(
    LOCALE_STORAGE_CONSTRUCTORIO_CLIENT_ID,
    generateUUID()
  )

  useEffect(() => {
    if (!window.localStorage) {
      // If local storage is not supported, handle accordingly
      console.error('Local storage is not supported in this environment.')
      return
    }

    // Initialize ConstructorIOClient with the session ID from local storage
    if (!client) {
      const cioClient = new ConstructorIOClient({
        apiKey:
          process.env.NEXT_PUBLIC_CONSTRUCTOR_API_KEY ?? 'API_KEY_NOT_SET',
        sessionId: getSessionId(),
        clientId: cioClientId,
        userId,
      })
      setClient(cioClient)
    }
  }, [cioClientId, userId])

  // timer to update session id after 30 minutes of inactivity
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_CONSTRUCTOR_API_KEY) {
      throw new Error('NEXT_PUBLIC_CONSTRUCTOR_API_KEY is not set')
    }

    // check inactivity every 30 minutes
    const intervalId = setInterval(() => {
      const lastActivity = window.localStorage.getItem('lastActivity')
      if (!lastActivity) {
        window.localStorage.setItem(
          'lastActivity',
          new Date().getTime().toString()
        )
        return
      }

      const now = new Date().getTime()

      if (lastActivity && now - parseInt(lastActivity, 10) > HALF_HOUR) {
        setClient(
          new ConstructorIOClient({
            apiKey: process.env.NEXT_PUBLIC_CONSTRUCTOR_API_KEY ?? '',
            sessionId: getSessionId(),
            clientId: cioClientId,
            userId: userId,
          })
        )
      }
    }, HALF_HOUR)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return client
}
