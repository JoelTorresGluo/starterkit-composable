---
sidebar_position: 2
title: Bloomreach Cartridge Installation
---

#### 1. Cartridge Installation

1. **Download Source Code**: Obtain the cartridge [source code.](https://github.com/bloomreach/discovery-sfcc-b2c)
2. **Digital Server Connection**: Establish a new digital server connection with your SFCC Instance.
3. **Import Cartridges**: Import the cartridges to a workspace in Salesforce UX Studio.
4. **Add to Project Reference**: Add cartridges to the Project Reference of the Server Connection.
5. **Build and Upload**: Wait for Studio to complete the workspace build and upload source codes to the sandbox.

#### 2. Assigning Cartridges to the Site

1. Go to **Administration > Sites > Manage Sites**.
2. Select your site from the "Storefront Sites" list.
3. In the Settings tab, add `int_bloomreach` at the beginning of the cartridge path.