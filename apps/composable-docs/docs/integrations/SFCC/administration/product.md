---
sidebar_position: 3
---

# Products

This document describes the administration and merchandising of Products in SFCC.

## Product Setup

### Product Types

There are several product types in SFCC, which can be used depending on the business case:

| Product Type      | Description                                                                                                                                                                                                                                    |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Standard Product  | A standalone product that is sold individually on the storefront.                                                                                                                                                                              |
| Base Product      | A master product that contains child (variant) products. Each variant product represents a combination of variation attributes (ex: size and color). Attributes populated on the base product will automatically be inherited by the variants. |
| Variation Product | A child of a master product, which represents a combination of variation attributes (ex: size and color)                                                                                                                                       |
| Product Set       | A group of related products that are designated for display together on the storefront, but can be purchased individually (ex: a collection of clothes and accessories that form an outfit)                                                    |
| Product Bundle    | A single SKU that represents a bundle of individual products, displayed together on the storefront, and purchased together.                                                                                                                    |

### Core Product Attributes

There are many product attributes available out of the box, and custom attributes can be created to extend native product functionality. Below are some of the core attributes provided by the platform in order to support product functionality.

#### General

- **ID** _(string)_: The unique identifier for the product **(required)**
- **Catalog** _(Catalog)_: The catalog which owns the product **(required)**
- **Tax Class** _(Enum TaxClass)_: The tax class associated to the product (configured in Taxation module)
- **Searchable** _(boolean)_: When true, displays product in search results and PLPs
- **Searchable if Unavailable** _(boolean)_: When true, displays product in search results and PLPs even if product is unavailable
- **Name** _(string)_: The display name of the product
- **Online** _(boolean)_: When false, product will be effectively "turned off". It will not display in search, users cannot browse to the PDP, and it cannot be purchased.
- **Online From** _(boolean)_: The date from which a product will be considered `online`
- **Online To** _(boolean)_: The date from which a product will be considered `offline`

#### SEO

- **Page Title** _(string)_: Used to set a specific meta title
- **Page Description** _(string)_: Used to set a specific meta description
- **Page Keywords** _(string)_: Used to set specific meta keywords
- **Page URL** _(string)_: Used to define a custom URL for the PDP

#### Search

- **Search Placement** _(number)_: Allows manually setting the search position in the top 8 results
- **Search Rank** _(number)_: Used in sorting, rank products to give them a higher weight in results

### Product Options

Product options are used to customize products added to cart. They differ from variation products in that they have their own price which gets added to the total. An example of a product option could be charging $10 extra for a longer chain on a necklace.

### Product Links

Product links are used to associate products together for various purposes, such as recommendation or displaying similar products on the storefront. 

| Link Type            | Description                                                      |
|----------------------|------------------------------------------------------------------|
| Replacement          | Similar or substitute products (ex: if product is out of stock)  |
| Cross-Selling        | Related products which are suitable to sell in addition          |
| Up-Selling           | Higher value products suitable for upselling                     |
| Accessory            | Complementary products that can be accessorised with the product |
| Follow-Up            | Products that follow the original                                |
| Different Order Unit | Products following the original with a different orderable unit  |
| Spare Parts          | Spare parts for the product                                      |
| Other                | Other reasons not covered by the above                           |

### Product Recommendations

Products can be curated specifically for recommendation content slots. This can be used as an alternative to Einstein dynamic recommendations when merchandisers want to hand-pick recommended products.

1. From a product in Business Manager, click the **Recommendations** tab
2. Click **New**
3. Choose a catalog to configure recommendations for
4. Choose the recommendation type
5. Select one or more products
6. Click **Finish**

## Importing & Exporting Products

Products can be imported and exported using the **Catalog Import & Export** utility in SFCC.

### Importing Catalog

1. Go to **Merchant Tools > Catalogs > Import & Export**
2. Click **Import and Export Files > Upload**
3. Next to **Upload File**, click **Choose File**
4. Select the catalog XML file and click **Upload**
5. Go back to **Merchant Tools > Catalogs > Import & Export**
6. Click **Catalogs > Imports**
7. Select the uploaded file and click **Next**
8. Once validation is complete, click **Next**
9. Click **MERGE** and click **Import**

### Export Catalog

1. Go to **Merchant Tools > Catalogs > Import & Export**
2. Click **Catalogs > Exports**
3. Choose the catalog you want to export
4. Enter a filename and click **Export**

### Example XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<catalog xmlns="http://www.demandware.com/xml/impex/catalog/2006-10-31" catalog-id="apparel-m-catalog">
    <header>
        <image-settings>
            <internal-location base-path="/images"/>
            <view-types>
                <view-type>large</view-type>
                <view-type>medium</view-type>
                <view-type>small</view-type>
                <view-type>swatch</view-type>
                <view-type>hi-res</view-type>
            </view-types>
            <variation-attribute-id>color</variation-attribute-id>
            <alt-pattern>${productname}, ${variationvalue}, ${viewtype}</alt-pattern>
            <title-pattern>${productname}, ${variationvalue}</title-pattern>
        </image-settings>
    </header>

    <product product-id="25419639M">
        <ean/>
        <upc/>
        <unit/>
        <min-order-quantity>1</min-order-quantity>
        <step-quantity>1</step-quantity>
        <display-name xml:lang="x-default">Long Sleeve Turtleneck Top</display-name>
        <display-name xml:lang="fr-FR">Col roulé à manches longues</display-name>
        <display-name xml:lang="it-IT">Maglione a collo alto con manica lunga</display-name>
        <display-name xml:lang="ja-JP">長袖タートルネックトップス</display-name>
        <display-name xml:lang="zh-CN">长袖高领上衣</display-name>
        <short-description xml:lang="x-default">During chilly days it's great to have this long sleeve basic cotton turtleneck. Long sleeve basic cotton turtle neck.</short-description>
        <short-description xml:lang="fr-FR">Avec ce col roulé classique en coton à manches longues, affrontez en toute confiance les journées plus fraîches. Col roulé basique en coton à manches longues</short-description>
        <short-description xml:lang="it-IT">Nelle giornate fredde, questo maglione a collo alto e maniche lunghe è l'ideale. Maglione base in cotone con collo alto e manica lunga.</short-description>
        <short-description xml:lang="ja-JP">肌寒い日にぴったりの長袖ベーシックコットンタートルネックです。長袖のベーシックコットンタートルネック</short-description>
        <short-description xml:lang="zh-CN">在凉爽的天气里，这样的基本款长袖棉质高领上衣是最完美的选择。长袖基本款棉质高领上衣。</short-description>
        <long-description xml:lang="x-default">During chilly days it's great to have this long sleeve basic cotton turtleneck. Long sleeve basic cotton turtle neck.</long-description>
        <long-description xml:lang="fr-FR">Avec ce col roulé classique en coton à manches longues, affrontez en toute confiance les journées plus fraîches. Col roulé basique en coton à manches longues</long-description>
        <long-description xml:lang="it-IT">Nelle giornate fredde, questo maglione a collo alto e maniche lunghe è l'ideale. Maglione base in cotone con collo alto e manica lunga.</long-description>
        <long-description xml:lang="ja-JP">肌寒い日にぴったりの長袖ベーシックコットンタートルネックです。長袖のベーシックコットンタートルネック</long-description>
        <long-description xml:lang="zh-CN">在凉爽的天气里，这样的基本款长袖棉质高领上衣是最完美的选择。长袖基本款棉质高领上衣。</long-description>
        <store-force-price-flag>false</store-force-price-flag>
        <store-non-inventory-flag>false</store-non-inventory-flag>
        <store-non-revenue-flag>false</store-non-revenue-flag>
        <store-non-discountable-flag>false</store-non-discountable-flag>
        <online-flag>true</online-flag>
        <online-from>2010-08-24T04:00:00.000Z</online-from>
        <available-flag>true</available-flag>
        <searchable-flag>true</searchable-flag>
        <images>
            <image-group view-type="large">
                <image path="large/PG.10211613.JJ1RYXX.PZ.jpg"/>
                <image path="large/PG.10211613.JJ1RYXX.BZ.jpg"/>
            </image-group>
            <image-group view-type="large">
                <variation attribute-id="color" value="JJ1RYXX"/>
                <image path="large/PG.10211613.JJ1RYXX.PZ.jpg"/>
                <image path="large/PG.10211613.JJ1RYXX.BZ.jpg"/>
            </image-group>
            <image-group view-type="large">
                <variation attribute-id="color" value="JJD95XX"/>
                <image path="large/PG.10211613.JJD95XX.PZ.jpg"/>
                <image path="large/PG.10211613.JJD95XX.BZ.jpg"/>
            </image-group>
            <image-group view-type="large">
                <variation attribute-id="color" value="JJM85XX"/>
                <image path="large/PG.10211613.JJM85XX.PZ.jpg"/>
                <image path="large/PG.10211613.JJM85XX.BZ.jpg"/>
            </image-group>
            <image-group view-type="medium">
                <image path="medium/PG.10211613.JJ1RYXX.PZ.jpg"/>
                <image path="medium/PG.10211613.JJ1RYXX.BZ.jpg"/>
            </image-group>
            <image-group view-type="medium">
                <variation attribute-id="color" value="JJ1RYXX"/>
                <image path="medium/PG.10211613.JJ1RYXX.PZ.jpg"/>
                <image path="medium/PG.10211613.JJ1RYXX.BZ.jpg"/>
            </image-group>
            <image-group view-type="medium">
                <variation attribute-id="color" value="JJD95XX"/>
                <image path="medium/PG.10211613.JJD95XX.PZ.jpg"/>
                <image path="medium/PG.10211613.JJD95XX.BZ.jpg"/>
            </image-group>
            <image-group view-type="medium">
                <variation attribute-id="color" value="JJM85XX"/>
                <image path="medium/PG.10211613.JJM85XX.PZ.jpg"/>
                <image path="medium/PG.10211613.JJM85XX.BZ.jpg"/>
            </image-group>
            <image-group view-type="small">
                <image path="small/PG.10211613.JJ1RYXX.PZ.jpg"/>
                <image path="small/PG.10211613.JJ1RYXX.BZ.jpg"/>
            </image-group>
            <image-group view-type="small">
                <variation attribute-id="color" value="JJ1RYXX"/>
                <image path="small/PG.10211613.JJ1RYXX.PZ.jpg"/>
                <image path="small/PG.10211613.JJ1RYXX.BZ.jpg"/>
            </image-group>
            <image-group view-type="small">
                <variation attribute-id="color" value="JJD95XX"/>
                <image path="small/PG.10211613.JJD95XX.PZ.jpg"/>
                <image path="small/PG.10211613.JJD95XX.BZ.jpg"/>
            </image-group>
            <image-group view-type="small">
                <variation attribute-id="color" value="JJM85XX"/>
                <image path="small/PG.10211613.JJM85XX.PZ.jpg"/>
                <image path="small/PG.10211613.JJM85XX.BZ.jpg"/>
            </image-group>
            <image-group view-type="swatch">
                <variation attribute-id="color" value="JJ1RYXX"/>
                <image path="swatch/PG.10211613.JJ1RYXX.CP.jpg"/>
            </image-group>
            <image-group view-type="swatch">
                <variation attribute-id="color" value="JJD95XX"/>
                <image path="swatch/PG.10211613.JJD95XX.CP.jpg"/>
            </image-group>
            <image-group view-type="swatch">
                <variation attribute-id="color" value="JJM85XX"/>
                <image path="swatch/PG.10211613.JJM85XX.CP.jpg"/>
            </image-group>
        </images>
        <tax-class-id>standard</tax-class-id>
        <sitemap-included-flag>true</sitemap-included-flag>
        <sitemap-changefrequency>daily</sitemap-changefrequency>
        <sitemap-priority>1.0</sitemap-priority>
        <page-attributes>
            <page-title xml:lang="x-default">Long Sleeve Turtleneck Top</page-title>
            <page-title xml:lang="fr-FR">Col roulé à manches longues</page-title>
            <page-title xml:lang="it-IT">Maglione a collo alto con manica lunga</page-title>
            <page-title xml:lang="ja-JP">長袖タートルネックトップス</page-title>
            <page-title xml:lang="zh-CN">长袖高领上衣</page-title>
            <page-description xml:lang="x-default">During chilly days it's great to have this long sleeve basic cotton turtleneck. Long sleeve basic cotton turtle neck.</page-description>
            <page-description xml:lang="fr-FR">Avec ce col roulé classique en coton à manches longues, affrontez en toute confiance les journées plus fraîches. Col roulé basique en coton à manches longues</page-description>
            <page-description xml:lang="it-IT">Nelle giornate fredde, questo maglione a collo alto e maniche lunghe è l'ideale. Maglione base in cotone con collo alto e manica lunga.</page-description>
            <page-description xml:lang="ja-JP">肌寒い日にぴったりの長袖ベーシックコットンタートルネックです。長袖のベーシックコットンタートルネック</page-description>
            <page-description xml:lang="zh-CN">在凉爽的天气里，这样的基本款长袖棉质高领上衣是最完美的选择。长袖基本款棉质高领上衣。</page-description>
            <page-url xml:lang="x-default">long-sleeve-turtleneck-top</page-url>
            <page-url xml:lang="fr-FR">col-roulé-à-manches-longues</page-url>
            <page-url xml:lang="it-IT">maglione-collo-alto-manica-lunga</page-url>
            <page-url xml:lang="ja-JP">長袖タートルネックトップス</page-url>
            <page-url xml:lang="zh-CN">长袖高领上衣</page-url>
        </page-attributes>
        <variations>
            <attributes>
                <variation-attribute attribute-id="color" variation-attribute-id="color">
                    <display-name xml:lang="x-default">Color</display-name>
                    <display-name xml:lang="en-GB">Colour</display-name>
                    <display-name xml:lang="fr-FR">Coloris </display-name>
                    <display-name xml:lang="it-IT">Colore</display-name>
                    <display-name xml:lang="ja-JP">色</display-name>
                    <display-name xml:lang="zh-CN">颜色</display-name>
                    <variation-attribute-values>
                        <variation-attribute-value value="JJ169XX">
                            <display-value xml:lang="x-default">Black</display-value>
                            <display-value xml:lang="fr-FR">Noir</display-value>
                            <display-value xml:lang="it-IT">Nero</display-value>
                            <display-value xml:lang="ja-JP">ブラック</display-value>
                            <display-value xml:lang="zh-CN">黑色</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="JJ1RYXX">
                            <display-value xml:lang="x-default">Panama Khaki</display-value>
                            <display-value xml:lang="fr-FR">Kaki panama</display-value>
                            <display-value xml:lang="it-IT">Sabbia</display-value>
                            <display-value xml:lang="ja-JP">パナマカーキ</display-value>
                            <display-value xml:lang="zh-CN">巴拿马卡其色</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="JJ772XX">
                            <display-value xml:lang="x-default">Espresso</display-value>
                            <display-value xml:lang="fr-FR">Expresso</display-value>
                            <display-value xml:lang="it-IT">Espresso</display-value>
                            <display-value xml:lang="ja-JP">エスプレッソ</display-value>
                            <display-value xml:lang="zh-CN">意式咖啡色</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="JJD95XX">
                            <display-value xml:lang="x-default">Plum Wine</display-value>
                            <display-value xml:lang="fr-FR">Prune</display-value>
                            <display-value xml:lang="it-IT">Prugna</display-value>
                            <display-value xml:lang="ja-JP">プラムワイン</display-value>
                            <display-value xml:lang="zh-CN">李子红色</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="JJG80XX">
                            <display-value xml:lang="x-default">Sugar</display-value>
                            <display-value xml:lang="fr-FR">Sucre</display-value>
                            <display-value xml:lang="it-IT">Zucchero</display-value>
                            <display-value xml:lang="ja-JP">シュガー</display-value>
                            <display-value xml:lang="zh-CN">蜜糖色</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="JJI15XX">
                            <display-value xml:lang="x-default">White</display-value>
                            <display-value xml:lang="fr-FR">Blanc</display-value>
                            <display-value xml:lang="it-IT">Bianco</display-value>
                            <display-value xml:lang="ja-JP">ホワイト</display-value>
                            <display-value xml:lang="zh-CN">白色</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="JJM85XX">
                            <display-value xml:lang="x-default">Rose Garden</display-value>
                            <display-value xml:lang="fr-FR">Jardin de roses</display-value>
                            <display-value xml:lang="it-IT">Rosa</display-value>
                            <display-value xml:lang="ja-JP">ローズガーデン</display-value>
                            <display-value xml:lang="zh-CN">花园玫瑰色</display-value>
                        </variation-attribute-value>
                    </variation-attribute-values>
                </variation-attribute>
                <variation-attribute attribute-id="size" variation-attribute-id="size">
                    <display-name xml:lang="x-default">Size</display-name>
                    <display-name xml:lang="fr-FR">Taille</display-name>
                    <display-name xml:lang="it-IT">Taglia</display-name>
                    <display-name xml:lang="ja-JP">サイズ</display-name>
                    <display-name xml:lang="zh-CN">尺码</display-name>
                    <variation-attribute-values>
                        <variation-attribute-value value="9XS">
                            <display-value xml:lang="x-default">XS</display-value>
                            <display-value xml:lang="fr-FR">XS</display-value>
                            <display-value xml:lang="it-IT">XS</display-value>
                            <display-value xml:lang="ja-JP">XS</display-value>
                            <display-value xml:lang="zh-CN">XS</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="9SM">
                            <display-value xml:lang="x-default">S</display-value>
                            <display-value xml:lang="fr-FR">S</display-value>
                            <display-value xml:lang="it-IT">S</display-value>
                            <display-value xml:lang="ja-JP">S</display-value>
                            <display-value xml:lang="zh-CN">S</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="9MD">
                            <display-value xml:lang="x-default">M</display-value>
                            <display-value xml:lang="fr-FR">M</display-value>
                            <display-value xml:lang="it-IT">M</display-value>
                            <display-value xml:lang="ja-JP">M</display-value>
                            <display-value xml:lang="zh-CN">M</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="9LG">
                            <display-value xml:lang="x-default">L</display-value>
                            <display-value xml:lang="fr-FR">L</display-value>
                            <display-value xml:lang="it-IT">L</display-value>
                            <display-value xml:lang="ja-JP">L</display-value>
                            <display-value xml:lang="zh-CN">L</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="9XL">
                            <display-value xml:lang="x-default">XL</display-value>
                            <display-value xml:lang="fr-FR">XL</display-value>
                            <display-value xml:lang="it-IT">XL</display-value>
                            <display-value xml:lang="ja-JP">XL</display-value>
                            <display-value xml:lang="zh-CN">XL</display-value>
                        </variation-attribute-value>
                    </variation-attribute-values>
                </variation-attribute>
            </attributes>
            <variants>
                <variant product-id="701642489207M"/>
                <variant product-id="701642489238M"/>
                <variant product-id="701642813187M"/>
                <variant product-id="701642813200M"/>
                <variant product-id="701642489221M"/>
                <variant product-id="701642489214M"/>
                <variant product-id="701642489030M"/>
                <variant product-id="701642813194M"/>
            </variants>
        </variations>
        <pinterest-enabled-flag>false</pinterest-enabled-flag>
        <facebook-enabled-flag>false</facebook-enabled-flag>
        <store-attributes>
            <force-price-flag>false</force-price-flag>
            <non-inventory-flag>false</non-inventory-flag>
            <non-revenue-flag>false</non-revenue-flag>
            <non-discountable-flag>false</non-discountable-flag>
        </store-attributes>
    </product>

    <category-assignment category-id="womens-clothing-tops" product-id="25419639M">
        <primary-flag>true</primary-flag>
    </category-assignment>

</catalog>
```