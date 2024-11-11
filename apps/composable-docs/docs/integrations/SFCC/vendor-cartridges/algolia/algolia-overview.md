---
sidebar_position: 1
---

# Algolia Cartridge Overview

This documentation describes the integration and details of the Algolia SFCC cartidge. The cartridge can be obtained from the [algoliasearch-sfcc-b2c](https://github.com/algolia/algoliasearch-sfcc-b2c) Github repo.

## Understanding the Cartridge

The Algolia cartridge provides two primary functionalities:
- Jobs and logic to synchronize product, price and inventory to Algolia indexes
- Scaffolding to display InstantSearch, Autocomplete and Recommend with in an SFRA or SiteGenesis storefront

### Included Cartridges

| Cartridge               | Description                                                          |
|-------------------------|----------------------------------------------------------------------|
| algolia_sg_changes      | Used for integrating InstantSearch in SiteGenesis                    |
| bm_algolia              | Integrate index and administrative information into Business Manager |
| int_algolia             | Used to manage product, inventory and pricing feeds                  |
| int_algolia_controllers | Used for integrating InstantSearch in SiteGenesis                    |
| int_algolia_sfra        | Used for integrating InstantSearch in SFRA                           |

If the cartridge will only be used for pushing indexes, then only `bm_algolia` and`int_algolia` are needed.

