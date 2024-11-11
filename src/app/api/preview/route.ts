import { DRAFT_MODE_DATA_COOKIE_NAME } from '@modules/general'
import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (
    process.env.CMS_PREVIEW_SECRET &&
    process.env.CMS_PREVIEW_SECRET !== secret
  ) {
    return new Response('unauthorized', { status: 401 })
  }

  const redirectUrl = searchParams.get('redirectUrl')
  const previewData = searchParams.get('previewData')

  if (!redirectUrl || !previewData) {
    return new Response('Invalid request', { status: 401 })
  }

  draftMode().enable()

  const cookieStore = cookies()
  const draftModeCookie = cookieStore.get('__prerender_bypass')?.value

  if (draftModeCookie) {
    // next's draft mode cookie is set to sateSite: 'Lax',
    // rewrite to sameSite: 'none', so it works on the CMS iframe
    cookieStore.set({
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      name: '__prerender_bypass',
      value: draftModeCookie,
    })

    cookieStore.set({
      sameSite: 'none',
      httpOnly: true,
      secure: true,
      name: DRAFT_MODE_DATA_COOKIE_NAME,
      value: previewData,
    })
  }

  redirect(redirectUrl)
}
