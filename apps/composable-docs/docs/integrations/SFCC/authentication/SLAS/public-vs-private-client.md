---
sidebar_position: 3
---

# Public vs. Private Clients

SLAS has the ability to create both public and private clients. Which type of client will be used depends on the type of app that is interacting with the SLAS API.

## Public Clients

- Do not have a client secret
- Are used where an app is not able to securely store a secret for a registered user
- **Example:** Single page apps, mobile apps

## Private Clients

- Have a client secret
- Are used when an app is able to securely store a client secret
- **Example:** Full stack apps