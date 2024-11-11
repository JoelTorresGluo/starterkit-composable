# Salesforce Commerce Cloud (SFCC)

For more information regarding configuration, please refer to [oficial SFCC documentation](https://help.salesforce.com/s/articleView?id=cc.b2c_getting_started.htm&type=5)

## Configuring the Integration

1. Follow this [documentation](https://help.salesforce.com/s/articleView?id=cc.b2c_account_manager_add_api_client_id.htm&type=5) to create new API keys:
2. Follow this [documentation](https://developer.salesforce.com/docs/commerce/commerce-api/guide/base-url.html) to understand and retrieve shortCode and organizationId

3. In the application's root folder,  create or update the `.env.local` file:
  
       ```shell
        SFCC_CLIENT_ID={clientId} #generated in step 1
        SFCC_CLIENT_SECRET={clientSecret} #generated in step 1
        SFCC_ORG_ID={organizationId} #f_ecom_<realm>_(dev|stg|prd)
        SFCC_SHORT_CODE={shortCode} #retrieved from step 2
        SFCC_SITE_ID={siteId} #site created under Business Manager -> Administration -> Manage Sites
       ```

## Further Information

    - [Administration](/docs/category/administration-1/)
    - [Authentication](/docs/category/authentication-1/)
    - [API Reference](/docs/category/api-reference-1/)
    - [Vendor Cartridges](/docs/category/vendor-cartridges-1/)