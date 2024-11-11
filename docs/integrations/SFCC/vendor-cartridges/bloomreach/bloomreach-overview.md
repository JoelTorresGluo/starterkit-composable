---
sidebar_position: 1
title: Bloomreach Search Service Overview
---

Bloomreach's search service is an advanced AI-powered solution designed to enhance the search functionality of e-commerce websites. It leverages machine learning and data-driven algorithms to deliver highly relevant search results, personalized experiences, and optimized product discovery for users.

### Key Features

1. **AI-Powered Relevance**
   - Utilizes artificial intelligence to understand user intent and deliver the most relevant search results.
   - Continuously learns and improves from user interactions and behaviors.

2. **Personalization**
   - Offers personalized search experiences based on individual user preferences, past behaviors, and purchase history.
   - Tailors search results to match each user’s unique needs and preferences.

3. **Natural Language Processing (NLP)**
   - Employs NLP to understand and interpret complex search queries, including synonyms, abbreviations, and common misspellings.
   - Enhances search accuracy by understanding the context and intent behind user queries.

4. **Faceted Search and Filtering**
   - Provides advanced filtering options, allowing users to refine search results based on various attributes such as price, brand, category, and more.
   - Improves user experience by making it easier to find specific products.

5. **Real-Time Indexing**
   - Ensures that the latest products and updates are available in search results without delay.
   - Supports dynamic and fast-paced e-commerce environments.

6. **Analytics and Insights**
   - Provides detailed analytics on search performance, user behavior, and engagement.
   - Offers insights to help optimize search strategies and improve overall user experience.

### Benefits

- **Increased Conversion Rates**: By delivering relevant and personalized search results, Bloomreach's search service helps to increase conversion rates and sales.
- **Enhanced User Experience**: Advanced search features and personalization lead to a more engaging and satisfying shopping experience for users.
- **Scalability**: The service is designed to handle high volumes of traffic and large product catalogs, making it suitable for businesses of all sizes.
- **Continuous Improvement**: Leveraging AI and machine learning ensures that the search experience continuously evolves and improves based on user interactions and data.

## Limitations

The cartridge must be downloaded and installed by a developer or agency for your SFCC instance. Currently, this integration does not support:

- **Consents as Events**: Customer flags can be imported as part of the Customers feed.
- **Web Tracking**: Use our JS SDK to handle web tracking in your Tag Manager separately.
- **Real-time Tracking (\>2 minutes)**: The cadence is defined on the SF side, depending on the export jobs.
- **Multi-storefront Installations**: No support for separating out data into different projects. The cartridge exports all data into files without filtering by storefronts. This is an issue if you want data separated by storefront into multiple Engagement projects (e.g., by region).

### Main Integration Steps

1. Cartridge Installation

2. Assigning Cartridges to the Site

3. Import Metadata

4. Service Configuration

5. Custom Site Preferences

6. Configure Product and Content Fields

7. Set Up Certificates

### Additional Considerations

- **Log Errors**: Monitor error logs in the customlog-Bloomreach log file.
- **API Limits**: Avoid running jobs more than once every 10 minutes to comply with Bloomreach API limits.
- **Support**: Contact your Bloomreach Success Manager for any issues or questions.