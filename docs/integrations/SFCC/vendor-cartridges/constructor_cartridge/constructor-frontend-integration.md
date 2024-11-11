---
sidebar_position: 5
title: Frontend Integration
---

The Constructor.io Salesforce Cartridge is a plug-and-play solution that allows you to easily integrate Constructor.io’s search and discovery features into your Salesforce Commerce Cloud site. You can customize the cartridge to fit your specific needs and preferences, and take advantage of the many front-end components provided out of the box. With the SFRA cartridge, you can enjoy a fast, reliable, and engaging search experience for your customers and boost your conversions and revenue.

### Cartridge Installation
Refer to the guide for [installing the Constructor Connect cartridge](./constructor-setup.md) and complete all SFRA frontend-related sections.

### Beacon Injection
For details on beacon setup, refer to the [Beacon Intallation](./constructor-beacon-install.md) section.

### Autocomplete Component
The autocomplete component is an easy-to-implement, customizable solution for your storefront that requires no developer time. 

#### Features
- Easily customizable
- Supports search suggestions
- Lightweight
- Accessible
- Continuously improved by our team
- Open source

### Customizing

#### Styling
Modify default styles by overlaying the `static/default/constructor/css/autocomplete-ui.css` file. To opt out of default styles, toggle the `Constructor_Autocomplete_DefaultStyles` custom site preference.

#### Behavior
Modify interaction outcomes (clicks, focus events, etc.) by overlaying the `static/default/constructor/js/autocomplete-ui-config.js` file.

### Exposed Site Preferences
All custom preferences are under the Constructor preference group:

- **Constructor_Autocomplete_DefaultStyles**: Toggles the use of default CSS styles.
- **Constructor_Autocomplete_Selector**: The target DOM element for the autocomplete component.
- **Constructor_Autocomplete_Enabled**: Toggle to enable or disable the autocomplete component.