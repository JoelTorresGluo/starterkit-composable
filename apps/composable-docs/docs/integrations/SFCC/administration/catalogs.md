---
sidebar_position: 1
---

# Catalog

This documentation provides comprehensive information about managing catalogs in Salesforce Commerce Cloud (SFCC). A catalog is a collection of products that you sell, organized into different categories, and is crucial for your product data management.

## Catalog Design

In SFCC Business Manager, you can enter product data manually or import it from an XML file. Most customers import product data from their Product Information Management (PIM) system or another system of record, then enhance it in Business Manager.

### Key Points

- **Product Data Configuration:** Configure product data to include variations, descriptions, images, videos, pricing, and inventory.
- **Category Navigation:** Categories and subcategories in your catalog function as the storefront navigation, helping customers locate products easily.
- **Catalog Best Practices:** Create two catalogs:
  - **Standard Catalog:** Mirrors the structure of your inventory, fulfillment, or product management systems. Not assigned to a site.
  - **Storefront Catalog:** Contains categories that appear on your storefront. Products must be assigned to storefront categories to show on the storefront.

## Catalog Configuration

After creating your standard catalog, complete the storefront catalog definition by:
- Creating categories
- Setting attributes
- Defining image paths
- Establishing search definitions
- Assigning page meta tag rules

### Maintain and Deploy Catalogs

Maintain catalogs on your staging instance and replicate them to the development instance for testing. After testing, replicate them to the production instance.

### Editing a Catalog

1. **Navigate to Catalogs:**
   - Select `Merchant Tools | Site | Products and Catalogs | Catalogs`
2. **Edit the Catalog:**
   - Click `Edit` for the catalog you want to manage.
   - Make your edits and click `Apply`.
3. **Delete Catalogs:**
   - Select the catalogs you want to delete and click `Delete`.

## Creating a Catalog

Before configuring categories or product data, create a catalog:

1. **Navigate to Catalogs:**
   - Select `Merchant Tools | Site | Products and Catalogs | Catalogs`
2. **Create a New Catalog:**
   - Click `New`.
   - On the General tab, provide the following information:
     - **Language:** Default language for the catalog.
     - **Catalog ID:** Unique ID for the catalog (cannot be changed later).
     - **Name:** Catalog name.
     - **Description:** (Optional) Specific explanation of the catalog’s purpose.
   - Click `Apply`.
3. **Complete the Catalog Definition:**
   - Assign the catalog to a site, set page image settings, create categories, set attributes, establish search definitions, set sorting rules, and assign page meta tag rules.

## Assigning a Catalog to a Site

Assign a catalog to a site on the Site Assignments tab:

1. **Navigate to Catalogs:**
   - Select `Merchant Tools | Site | Products and Catalogs | Catalogs`
2. **Select the Catalog:**
   - Click `Edit` for the catalog you want to manage.
3. **Site Assignments:**
   - Click the `Site Assignments` tab.
   - Select the sites to assign this catalog to and click `Apply`.

## Catalog Scenarios

Here are common ways to configure and use catalogs for merchandising:

### Single Catalog for All Products

Manage all products in a single catalog with the same structure as your storefront:

- Create one catalog (e.g., Catalog A) with category definitions, product definitions, and internal classification mirroring your inventory system.
- Associate Catalog A with your storefront, making its categories the storefront's navigation structure.

### Different Category Configuration for Storefront

Organize products differently on your storefront than within your organization:

- Create Catalog A with internal classification.
- Create Catalog B with desired categories for storefront navigation.
- Assign products from Catalog A to categories in Catalog B.
- Assign Catalog B to the storefront.

### Share Products Among Multiple Storefronts

Sell products on different storefronts but manage them in the same structure as your inventory system:

- Create Catalog A for internal use without assigning it to a storefront.
- Create Catalog B and Catalog C for different storefronts, assigning products from Catalog A to each.
- Assign Catalog B to Storefront 1 and Catalog C to Storefront 2.

### Share Products Between Two Storefronts

Manage a stable storefront and a dynamic sale storefront:

- Create Catalog A for all product definitions and stable storefront categories.
- Create Catalog B for sale-specific products and categories.

## Product Catalog CSV Files

B2C Commerce Business Manager supports importing and exporting catalogs in XML and CSV formats.

### Reading Exported CSV Files

- **Attributes:** Standard, custom (prefix `c__`), site-specific (suffix `__siteID`), and localized (suffix `__locale`).
- **Punctuation Handling:** Semicolons delineate multiple values; backslashes are used for escape sequences.
- **Excel Considerations:** Be aware of Excel’s formatting changes, such as removing leading zeros or converting long numeric values to scientific notation.

### Preparing CSV for Import

- Export a catalog first and modify it for changes.
- Only update existing catalogs, not create new ones.
- Ensure the CSV file is in UTF-8 format.
- Ensure attributes are valid and case-sensitive.
- Empty cells are ignored during import.
- Import CSV files in MERGE mode, specifying the target catalog.

### CSV Limitations

- **Supported:** Standard and custom attributes available in System Object Types | Product and supported by the XML catalog schema.
- **Not Supported:** Bundled-products, category-assignment, classification-category, images, options, product-detail-page-meta-tag-rules, product-links, variations attributes, and variations attribute values.

### Exporting Catalogs as CSV Files

1. **Navigate to Import & Export:**
   - Select `site | Products and Catalogs | Import & Export`
2. **Export Process:**
   - Under Catalogs, select `Export`.
   - Choose a catalog and enter a name for the file.
   - Select `Also export as a CSV file`.
   - Choose locales, sites, and attributes to include in the export.
   - Click `Export Entire Catalog` or `Export Specific Products`.

## Difference Between Master and Site Catalogs

- **Master Catalog:** Contains all product data and mirrors the structure of external systems. Not assigned to a site.
- **Site Catalog:** Used for storefront navigation, containing categories and products to be displayed on the storefront. Assigned to a site.

By organizing catalogs effectively and using best practices, you can ensure a seamless shopping experience for your customers while maintaining efficient product data management in Salesforce Commerce Cloud.
