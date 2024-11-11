---
sidebar_position: 2
---

# Price Books

Price books are a fundamental component in Salesforce Commerce Cloud (SFCC) for managing product pricing. They enable you to define prices for products in different currencies and quantities, providing a versatile mechanism to handle various pricing strategies. This documentation covers creating, managing, and assigning price books, along with dynamic pricing intricacies.

## Introduction to Price Books

A price book contains price definitions for a group of products, based on a specific currency. Each product in the price book can have multiple price tables, allowing you to define prices for varying quantities.

### Key Points

- **Organization-wide Scope:** Price books are defined at the organizational level, not limited to specific storefront sites.
- **Site Assignment:** For a price book to be effective in a storefront, it must be assigned to that site.
- **Multiple Price Books:** You can assign multiple price books to a site, provided the currencies are consistent.

## Creating Price Books and Price Tables

Creating price books and price tables involves using the Business Manager interface in SFCC. Follow these steps to create and manage price books:

### Step-by-Step Guide

1. **Navigate to Price Books:**
   - Select `site > Merchant Tools > Products and Catalogs > Price Books`.

2. **Create or Edit a Price Book:**
   - Click `New` to create a new price book or select an existing one to edit.

3. **General Information:**
   - On the General tab, enter the required information and click `Apply`.

4. **Define Attributes:**
   - Use the Attributes tab to specify custom attributes for the PriceBook system object and click `Apply`.

5. **Site Assignments:**
   - On the Site Assignments tab, select one or more sites and click `Apply`.

6. **Price Definitions:**
   - On the Price Definitions tab, specify prices for products to be included in the price book.

### Example XML for Price Book

Here is an example of a price book defined in XML format:

```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <pricebooks xmlns="http://www.demandware.com/xml/impex/pricebook/2006-10-31">
        <pricebook>
            <header pricebook-id="example-global-pricebook-eur-01">
                <currency>EUR</currency>
                <display-name xml:lang="x-default">example Global Pricebook EUR 01</display-name>
                <online-flag>true</online-flag>
            </header>

            <price-tables>
                <price-table product-id="0628343785608">
                    <amount quantity="1">475.00</amount>
                </price-table>
            </price-tables>
        </pricebook>
    </pricebooks>
```

## Assigning a Price Book to a Site

To make a price book effective in the storefront, it must be assigned to a site. Follow these steps to assign a price book:

1. **Navigate to Price Books:**
   - Select `site > Merchant Tools > Products and Catalogs > Price Books`.

2. **Select a Price Book:**
   - Click on the price book link you wish to assign.

3. **Site Assignments:**
   - On the Site Assignments tab, select the site(s) to which you want to assign the price book and click `Apply`.

## Store-Specific Pricing and Promotions

With store-specific pricing and promotions, you can select a price book for each of your stores, up to 2,000. This feature is only supported via XML import.

### Example XML for Store-Specific Assignment

```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <assignments xmlns="http://www.demandware.com/xml/impex/assignment/2020-11-30">
        <assignment assignment-id="Storeassignment_A">
            <description xml:lang="x-default">Price books and promotions assigned to Store A</description>
            <enabled-flag>true</enabled-flag>
            <start-date>2020-11-24T00:00:00.000Z</start-date>
            <end-date>2025-11-24T00:00:00.000Z</end-date>
            <assigned-sites>
                <site>SiteGenesis</site>
                <site>SiteGenesisGlobal</site>
            </assigned-sites>
            <qualifiers match-mode="any">
                <qualifier type="Store">Store A</qualifier>
            </qualifiers>
            <experiences>
                <pricebooks>
                    <pricebook-id>list_pricebook</pricebook-id>
                    <pricebook-id>sale_pricebook</pricebook-id>
                </pricebooks>
                <promotions>
                    <promotion-id>20%Off_promotion</promotion-id>
                </promotions>
            </experiences>
        </assignment>
    </assignments>
```

## Importing and Exporting Price Books

You can import and export price books to manage pricing data efficiently. 

### Importing Price Books

1. **Navigate to Import & Export:**
   - Select `Merchant Tools > site > Products and Catalogs > Import & Export`.

2. **Import Process:**
   - In the price books section, click `Import`.
   - Select one or more price books and click `Next`.
   - Click `Import`.

### Exporting Price Books

1. **Navigate to Import & Export:**
   - Select `Merchant Tools > site > Products and Catalogs > Import & Export`.

2. **Export Process:**
   - In the price books section, click `Export`.
   - Select the price books and click `Next`.
   - Enter a name for your exported file.
   - Click `Export`.

The import and export status appears at the bottom of the page. You can refresh until you see Success.

## Using Price Books with `setApplicablePriceBook`

Salesforce Commerce Cloud allows for dynamic price book assignments using the `setApplicablePriceBook` method. This method is essential for scenarios where pricing needs to be adjusted based on specific conditions such as promotions, customer groups, or regional pricing.

### How to Use `setApplicablePriceBook`

The `setApplicablePriceBook` method is utilized within custom business logic to set the appropriate price book dynamically. Here’s an example of how you might use it in a custom script:

1. **Identify the Price Book:**
   - Determine which price book to apply based on conditions such as customer group, time of the year, or active promotions.

2. **Apply the Price Book:**
   - Use the `setApplicablePriceBook` method to set the determined price book.

### Example Code Snippet

```js 

    var PriceBookMgr = require('dw/catalog/PriceBookMgr');
    var applicablePriceBook = PriceBookMgr.getPriceBook('winter_sale_pricebook');

    if (applicablePriceBook) {
        PriceBookMgr.setApplicablePriceBook(applicablePriceBook);
    }
```

### Detailed Use Cases and Considerations

#### Multi-Currency Pricing

In a global marketplace, it is crucial to handle multiple currencies effectively. Salesforce Commerce Cloud supports multi-currency price books, allowing you to cater to international customers seamlessly.

1. **Define Price Books for Each Currency:**
   - Create separate price books for each currency your business supports.
   - Ensure that products are listed with appropriate prices in each currency-specific price book.

2. **Assigning Price Books to Sites:**
   - Assign the relevant currency-specific price books to the appropriate storefront sites.

3. **Dynamic Assignment:**
   - Use the `setApplicablePriceBook` method to dynamically assign the correct price book based on the customer’s location or selected currency.

### Example Code Snippet for Multi-Currency Pricing

```js 
var PriceBookMgr = require('dw/catalog/PriceBookMgr');
var sessionCurrency = request.getSession().getCurrency().getCurrencyCode(); // Get the current session's currency
var currencyPriceBook = PriceBookMgr.getPriceBook('pricebook_' + sessionCurrency);

if (currencyPriceBook) {
    PriceBookMgr.setApplicablePriceBook(currencyPriceBook);
}
```

#### Regional and Seasonal Pricing

Regional and seasonal pricing strategies can be implemented using price books to offer region-specific discounts or seasonal sales.

1. **Regional Price Books:**
   - Create price books for different regions, reflecting local pricing strategies and promotions.
   - Use customer location data to determine the appropriate regional price book.

2. **Seasonal Price Books:**
   - Define price books for seasonal promotions, such as winter or summer sales.
   - Use date-based conditions to apply the correct seasonal price book dynamically.

### Example Code Snippet for Regional Pricing

```js 
var PriceBookMgr = require('dw/catalog/PriceBookMgr');
var customerRegion = 'EU'; // Example condition for regional pricing
var regionalPriceBook = PriceBookMgr.getPriceBook('regional_pricebook_' + customerRegion);

if (regionalPriceBook) {
    PriceBookMgr.setApplicablePriceBook(regionalPriceBook);
}
```

### Performance Considerations

- **Fallback Mechanisms:** Implement fallback mechanisms to handle scenarios where no applicable price book is found, ensuring a seamless customer experience.

Using `setApplicablePriceBook` effectively allows for a flexible and responsive pricing strategy that can adapt to various business needs and customer segments.