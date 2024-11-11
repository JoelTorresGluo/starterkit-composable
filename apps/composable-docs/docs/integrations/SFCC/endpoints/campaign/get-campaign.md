---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Campaign Details

## Purpose

This endpoint retrieves detailed information about a specific campaign. It supports the retrieval of data including campaign rules, validity, and applicability. This is vital for managing marketing activities within Salesforce Commerce Cloud (SFCC).

This endpoint is particularly useful for admins to verify and manage campaigns effectively.

## Authentication

A JSON Web Token (JWT) is required to authenticate the request. This token must be obtained through the appropriate authentication mechanisms provided by SFCC.

## Example
<Tabs>
  <TabItem value="commerce-sdk" label="Commerce SDK">

    ```js
      const options = {
          fetchOptions: {
              method: 'GET'
          },
          headers: {
              'Content-Type': 'application/json'
          },
          parameters: {
              campaignId: 'ThanksGivingCampaign',
              organizationId: 'org456',
              siteId: 'site789'
          },
          retrySettings: {
              retries: 3,
              retryDelay: 200
          }
      };

      const campaign = await campaignsClient.getCampaign({ options });
    ```  
  </TabItem>
  <TabItem value="SCAPI" label="SCAPI">

    ```http

     GET https://{shortCode}.api.commercecloud.salesforce.com/pricing/campaigns/v1/organizations/{organizationId}/campaigns/{campaignId}?siteId={YourSiteId}

    ```
  </TabItem>
</Tabs>

## Request

### URL

``GET https://{shortCode}.api.commercecloud.salesforce.com/pricing/campaigns/v1/organizations/{organizationId}/campaigns/{campaignId}?siteId={YourSiteId}``

### Headers

- ``Authorization: Bearer {AdminAPI_token}``
- ``Content-Type: application/json``

### URL Parameters

- ``shortCode string``: A region-specific merchant identifier. (required)
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > Shortcode
  - Example: ``0dnz6oep``
- ``organizationId string``: The identifier for the organization. (required)
  - Retrieved from Business Manager > Administration > Salesforce Commerce API Settings > organization ID
- ``campaignId string``: The identifier of the specific promotion to retrieve. (required)
  - Example: ``ThanksGivingCampaign``

### Query Parameters

- ``siteId string``: Identifies the site context of the request. Attributes may have site-specific values. (required)
  - Example: ``SiteGenesis``

### Request Body

*N/A*

## Response
<Tabs>
  <TabItem value="200" label="200">
    ```json
      {
        "campaignId": "NewYearCampaign",
        "coupons": [
          "20%offOrdersAbove100",
          "10%offties"
        ],
        "creationDate": "2019-10-03T19:36:56.000Z",
        "customerGroups": [
          "Registered"
        ],
        "description": "Campaign for the New Year",
        "enabled": true,
        "endDate": "2020-07-31T23:09:08.000Z",
        "lastModified": "2019-10-10T14:27:00.867Z",
        "sourceCodeGroups": [
          "affiliate-email",
          "gaming-email"
        ],
        "startDate": "2019-04-01T11:30:15.000Z"
      }
    ```
  </TabItem>
  <TabItem value="400" label="400">
If there is an issue with the request parameters or the request itself, the API responds with a 400 status code. The response includes details on what went wrong to help correct the request.
    
    ```json
      {
        "title": "Bad Request",
        "detail": "Required parameter campaignId missing or invalid."
      }
    ```
  </TabItem>
  <TabItem value="404" label="404">
When the specified promotion ID does not exist, the API responds with a 404 error.

    ```json
      {
        "title": "Campaign Not Found",
        "detail": "The campaign with ID 'ThanksGivingCampaign' could not be found."
      }
    ```
  </TabItem>
</Tabs>
References
Official Documentation

- commerce-sdk: [Pricing.Campaigns.getCampaign](https://salesforcecommercecloud.github.io/commerce-sdk/classes/pricing.campaigns.html#getcampaign)
- SCAPI: [getCampaign](https://developer.salesforce.com/docs/commerce/commerce-api/references/campaigns?meta=getCampaign)
