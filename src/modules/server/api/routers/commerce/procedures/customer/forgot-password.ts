import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { z } from 'zod'

export const customerForgotPassword = publicProcedure
  .input(
    z.object({
      email: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { email } = input
      const { ip } = ctx
      const { client } = ctx.commerce

      const resetToken =
        (await client.forgotPassword({ email, ip }))?.token ?? ''

      if (process.env.NODE_ENV === 'development') {
        // TODO: remove this in the future
        // eslint-disable-next-line no-console
        console.log(
          '\n********* Customer Reset Password Token:',
          resetToken,
          '****************\n',
          'go here to reset',
          'http://localhost:3003/account/reset?t=' + resetToken
        )
      }

      /*
        Delivery Implementation Step
          - Use an email service to send this token in an email to the customer
          - ie "Click here to reset your password"
             - URL sends user to /account/reset?t=INSERT_RESET_TOKEN_HERE
             - see component /modules/account/components/reset-password-form.tsx
             - resetToken by needs to be passed in query param "t"
        */
    })
  })
