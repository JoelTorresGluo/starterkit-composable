'use server'

import { revalidatePath } from 'next/cache'
import { cookies, draftMode } from 'next/headers'

export async function revalidatePreview() {
  revalidatePath('/', 'layout')
}

export async function exitPreview() {
  draftMode().disable()
  cookies().delete('previewData')
  revalidatePath('/')
}
