---
sidebar_position: 6
---

# Inventory Lists

Inventory lists are used to maintain inventory records in SFCC. Inventory lists are configured globally and assigned to specific sites.

## Creating an Inventory List

1. Go to **Merchant Tools > Products and Catalogs > Inventory**
2. Click **New**
3. Enter a unique ID ex. `inventory-list-ca`
4. Click **Apply**

### Inventory List Attributes

- **ID** _(string)_: The unique ID of the inventory list
- **Description** _(text)_: A description for the inventory list
- **Default In-Stock** _(boolean)_: When true, products that don't exist in the inventory list of the current site will default to Available
- **Use Bundle Inventory Only** _(boolean)_: By default, Product Bundles will be considered available if all their included products are also available. When true, this setting will use the inventory list inventory record for the Bundle SKU
- **On Order Inventory Enabled** _(boolean)_: When true, the inventory for a product will only be deducted on Order Export. When false, inventory will be deducted during order creation.

### Inventory Record Attributes

- **Perpetual** _(boolean)_: When true, inventory will be unlimited in the storefront
- **Allocation** _(number)_: The initial inventory count for the product. This is the basis for ATS calculations
- **Pre-order/Backorder Handling** _(enum)_: Allows customization of storefront template when the product is out of stock (backorder vs. preorder)
- **Pre-order/Backorder Allocation** _(number)_: How many items are available after the stock level reaches zero.
- **In-Stock Date** _(date)_: The date when stock will become available (in the case of backorder or preorder)
- **Turnover** _(number)_: The number of stock transactions that have occurred since the last allocation reset, which have been exported
- **On Order** _(number)_: The number of stock transactions that have occurred since the last allocation reset, which have not been exported
- **Stock Level** _(number)_: How many items are in stock. It's calculated as `max(0, allocation - turnover - on order)`.
- **ATS** _(number)_: The stock level. If preorder/backorder handling is enabled, then the calculation is `stock level + preorder/backorder allocation`
- **Availability Status** _(enum)_: The status of the inventory record. Values are `In Stock`, `Pre-Order`, `Backorder`, `Not Available`

## Adding an Inventory Record

:::note

Variation Base products should not have inventory records, only variations, as base products cannot be sold.

:::

1. From an inventory list, click the **Records** tab.
2. In the **ID or Name** field, enter a product ID
3. Click the **Not in Inventory List** radio button
4. Click **Find**
5. Next to the product, click **Create**
6. If the product can't be sold out, click **Perpetual**
7. If the product is not perpetual, input a numeric allocation for the current stock level
8. Click **Create**

## Import & Export Inventory Lists

### Importing Inventory Lists

1. Go to **Merchant Tools > Products and Catalogs > Import & Export**
2. Click **Import and Export Files > Upload**
3. Next to **Upload File**, click **Choose File**
4. Select the price book XML file and click **Upload**
5. Go back to **Merchant Tools > Products and Catalogs > Import & Export**
6. Click **Price Books > Imports**
7. Select the uploaded file and click **Next**
8. Once validation is complete, click **Next**
9. Click **MERGE** and click **Import**

### Export Price Book

1. Go to **Merchant Tools > Products and Catalogs > Import & Export**
2. Click **Price Books > Exports**
3. Choose the price books you want to export
4. Click **Next**
5. Enter a filename and click **Export**

### Example XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<pricebooks xmlns="http://www.demandware.com/xml/impex/pricebook/2006-10-31">
    <pricebook>
        <header pricebook-id="cny-m-list-prices">
            <currency>CNY</currency>
            <display-name xml:lang="x-default">List Prices</display-name>
            <online-flag>true</online-flag>
        </header>

        <price-tables>
            <price-table product-id="008884303989M">
                <amount quantity="1">480.00</amount>
            </price-table>

            <price-table product-id="008884303996M">
                <amount quantity="1">480.00</amount>
            </price-table>

            <price-table product-id="008884304009M">
                <amount quantity="1">640.00</amount>
            </price-table>

            <price-table product-id="008884304016M">
                <amount quantity="1">480.00</amount>
            </price-table>

            <price-table product-id="008884304023M">
                <amount quantity="1">480.00</amount>
            </price-table>
        </price-tables>
    </pricebook>
</pricebooks>
```