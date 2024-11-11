---
sidebar_position: 37
---
# Authentication

## Overview

The Storefront uses [NextAuth.js](https://next-auth.js.org/getting-started/introduction) for managing authentication, supporting OAuth2, JSON Web Tokens (JWTs), and password-based authentication.

NextAuth.js easily integrates with various OAuth providers, offering built-in support for popular services. It also allows for custom provider configurations for flexibility with other OAuth providers.

## Session Management

The Storefront supports both anonymous and logged in user sessions.

### Guest Sessions

The Storefront leverages the Commerce package to manage guest sessions, ensuring a seamless experience for users who are not logged in but still interact with the Storefront.

### User Sessions

User authentication in the Storefront is handled by the Commerce package, which implements the [`NextAuthOptions`](https://next-auth.js.org/configuration/options#options) interface. This setup allows NextAuth to manage user login operations and create secure JWTs for user sessions.

## API Authorization and Security

The Storefront API is designed to handle both public and secure data access:
- **Public Access**: For non-sensitive operations, the API provides public-facing endpoints that allow unauthenticated access. This includes guest users who can interact with the cart and shop without needing to log in. Guests are able to browse products, add items to their guest cart, and complete the checkout process. Public endpoints also serve general content, such as product listings or CMS-driven pages, which do not require user authorization.
- **Secure Access**: For customer-specific data, such as cart, orders, and profile information, the Storefront enforces strict authorization controls. These endpoints are secured, ensuring that each logged-in customer can only access their own data.



### JWT Authorization for Sensitive Endpoints

The Storefront uses JSON Web Tokens (JWT) to secure access to sensitive API endpoints. JWTs ensure that only authorized users can access protected resources.

JWT Configuration:
- `/apps/storefront/src/app/api/auth/[...nextauth]/route.ts`: Manages authentication and creates JWTs, handling the security of API requests to protected endpoints.
- Environment variable [NEXTAUTH_SECRET](https://next-auth.js.org/configuration/options#nextauth_secret) is used to sign and encrypt JWTs, ensuring secure communication for sensitive data. 

:::danger
Be sure to generate a strong `NEXTAUTH_SECRET` for Production, and store it in a safe location. See [here](https://next-auth.js.org/configuration/options#secret) on how to generate a safe secret for Production use.
:::

## Related Resources

- [NextAuth - Using a Built-in Provider](https://next-auth.js.org/configuration/providers/oauth#built-in-providers)
- [NextAuth - Using a Custom Provider](https://next-auth.js.org/configuration/providers/oauth#using-a-custom-provider)
- [Security](best_practices/security.md)
