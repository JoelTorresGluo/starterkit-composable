# Algolia Terraform Integration

## Setting Up Algolia Indexes with Terraform

This document outlines the steps to configure and create Algolia indexes using Terraform as part of the Orium's Accelerator monorepository. 
All these commands should be ran inside `packages/terraform/algolia`

### Prerequisites

Ensure you have the necessary environment variables set up. Create a `secret.auto.tfvars` file with the following content:

```hcl
# Algolia
app_id = "your_algolia_app_id"
app_key = "your_algolia_api_key"
```

Also, make sure to change the index name to your desired name on the file `algolia.index.tf`


### Procedure

1. **Initialize Terraform:**

   Open your terminal and navigate to the directory containing your Terraform configuration. Run the following command to initialize Terraform:

   ```bash
   terraform init
   ```
2. **Plan the Terraform changes:**

   After initialization, run the following command to see the execution plan for the Terraform configuration:

   ```bash
   terraform plan
   ```
3. **Apply the Terraform Configuration:**

   To create the Algolia indexes and their replicas, run the following command:

   ```bash
   terraform apply
   ```
### Configuration Details

The Terraform script will create a base index in Algolia along with four replicas:

- `priceAsc`: Sorted by price in ascending order.
- `priceDesc`: Sorted by price in descending order.
- `newest`: Sorted by the newest items.
- `NameAsc`: Sorted by name in ascending order.

These configurations can be adjusted as needed, for example, to support internationalization (i18n).

### Verification

After running the Terraform script, you should see the created indexes and replicas in the Algolia dashboard.

