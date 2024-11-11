---
sidebar_position: 1
---

# SLAS Overview

The **Shopper Login and API Access Service (SLAS)** is an API provided by Salesforce which is used to fetch tokens for Shopper APIs.

Shopper APIs are used by customers to interact with SCAPI in the context of a web app. In contrast, Admin APIs are intended to be used to manage and administrate instances, and use Account Manager authentication instead.

## Managing SLAS Clients

There are two primary ways of configuring SLAS clients:
1. SLAS Admin UI
2. SLAS Admin API

The SLAS Admin UI is the most straightforward way of configuring SLAS clients, but the SLAS Admin API allows more flexibility and configuration, as well as the ability to manage SLAS clients programmatically.

## Interacting with SLAS

In order to interact with SLAS, two steps must be taken:

1. Assign SLAS admin roles to users who will be managing SLAS clients
2. Create SLAS clients

