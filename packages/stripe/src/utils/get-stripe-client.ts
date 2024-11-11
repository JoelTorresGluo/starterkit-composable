import axios from 'axios'

const STRIPE_BASE_URL = 'https://api.stripe.com/v1'

export const getStripeClient = (secretKey: string) =>
  axios.create({
    baseURL: STRIPE_BASE_URL,
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  })
