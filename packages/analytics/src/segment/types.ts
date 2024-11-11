export interface SegmentEvent<Name = string, Params = any> {
  name: Name
  params?: Params
}

export type SegmentEventsCollection =
  | SegmentProductAddedEvent
  | SegmentProductViewedEvent
  | SegmentCartUpdatedEvent
  | SegmentCartViewedEvent
  | SegmentCartDrawerViewedEvent
  | SegmentCheckoutStartedEvent
  | SegmentOrderSubmittedEvent
  | SegmentProductListViewedEvent

export type SegmentProductAddedEvent = SegmentEvent<
  'Product Added',
  {
    /* brand of the product */
    brand?: string
    /* Id of the cart. */
    cart_id?: string
    /* L1 category */
    category1?: string
    /* L2 category */
    category2?: string
    /* L3 category */
    category3?: string
    /* Image url of the product */
    image_url?: string
    /* Name of the product being viewed. */
    name?: string
    /* Position of the product in the list */
    position?: number
    /* Product Price displayed in the list */
    price?: number
    /* Product ID displayed in the list */
    product_id?: string
    /* Quantity of a product. */
    quantity?: number
    /* Size of a product. */
    size?: string
    /* Product SKU displayed in the list */
    sku?: string
    /* Source of the product selection. (i.e. Homepage, category page, wishlist etc.) */
    source?: string
    /* URL of the product page */
    url?: string
    /* Product Variant displayed in the list */
    variant?: string
    /* The product list being viewed. */
    list_id?: string | number
    /* The name of the list in which the product was presented to the user. */
    list_name?: string
  }
>

export type SegmentProductViewedEvent = SegmentEvent<
  'Product Viewed',
  {
    /* Brand of the product. */
    brand?: string
    /* L1 category */
    category1?: string
    /* L2 category */
    category2?: string
    /* L3 category */
    category3?: string
    /* Image url of the product */
    image_url?: string
    /* Name of the product being viewed. */
    name?: string
    /* Position of the product in the list */
    position?: number
    /* Product Price displayed in the list */
    price?: number
    /* Product ID displayed in the list */
    product_id?: string
    /* Size of a product. */
    size?: string
    /* Product SKU displayed in the list */
    sku?: string
    /* URL of the product page */
    url?: string
    /* The product list being viewed. */
    list_id?: string | number
    /* The name of the list in which the product was presented to the user. */
    list_name?: string
  }
>

export type SegmentCartUpdatedEvent = SegmentEvent<
  'Cart Updated',
  {
    /* Id of the cart. */
    cart_id?: string
    products?: {
      /* Brand associated with the product */
      brand?: string
      /* Image url of the product. */
      image_url?: string
      /* Name of the product being viewed. */
      name?: string
      /* URL of the product page. */
      url?: string
      /* Position in the product list (ex. 3). */
      position?: number
      /* Price ($) of the product being viewed. */
      price?: number
      /* Database id of the product being viewed. */
      product_id?: string | number
      /* Quantity of a product. */
      quantity?: number
      /* The product's SKU number. */
      sku?: string
      /* Variant of the product. */
      variant?: string
      /* L1 category */
      category1?: string
      /* L2 category */
      category2?: string
      /* L3 category */
      category3?: string
    }[]
    /* What occured in the cart? Quantity increase, Product Removed */
    action?: string
  }
>

export type SegmentCartViewedEvent = SegmentEvent<
  'Cart Viewed',
  {
    /* Id of the cart. */
    cart_id?: string
    /* Currency code for the product. (i.e. CAD). */
    currency?: string
    /* Email provided by the customer. */
    email?: string
    /* The count of items within the cart. */
    item_count?: number
    products?: {
      /* Brand associated with the product */
      brand?: string
      /* URL of the product page. */
      url?: string
      /* Price ($) of the product being viewed. */
      price?: number
      /* Database id of the product being viewed. */
      product_id?: string | number
      /* Image url of the product. */
      image_url?: string
      /* Name of the product being viewed. */
      name?: string
      /* Quantity of a product. */
      quantity?: number
      /* Size of a product. */
      size?: string
      /* Variant of the product. */
      variant?: string
      /* Position in the product list (ex. 3). */
      position?: number
      /* The product's SKU number. */
      sku?: string
      /* L1 category */
      category1?: string
      /* L2 category */
      category2?: string
      /* L3 category */
      category3?: string
      /* Source of the product selection. (i.e. Homepage, category page, wishlist etc.) */
      source?: string
    }[]
    /* Revenue with discounts and coupons added */
    total?: number
  }
>

export type SegmentCartDrawerViewedEvent = SegmentEvent<
  'Cart Drawer Viewed',
  SegmentCartViewedEvent['params']
>

export type SegmentCheckoutStartedEvent = SegmentEvent<
  'Checkout Started',
  {
    /* Id of the cart */
    cart_id?: string
    /* Currency code for the product. (i.e. CAD) */
    currency?: string
    /* Identifies whether the checkout customer is a guest or registered user */
    guest?: boolean
    products?: {
      /* Brand associated with the product */
      brand?: string
      /* Image url of the product. */
      image_url?: string
      /* URL of the product page. */
      url?: string
      /* Price ($) of the product being viewed. */
      price?: number
      /* Position in the product list (ex. 3). */
      position?: number
      /* Database id of the product being viewed. */
      product_id?: string | number
      /* Name of the product being viewed. */
      name?: string
      /* Quantity of a product. */
      quantity?: number
      /* Size of a product. */
      size?: string
      /* Variant of the product. */
      variant?: string
      /* The product's SKU number. */
      sku?: string
      /* L1 category */
      category1?: string
      /* L2 category */
      category2?: string
      /* L3 category */
      category3?: string
    }[]
    /* Revenue with discounts and coupons added */
    total?: number
    /* The product list being viewed. */
    list_id?: number
    /* "The name of the list in which the product was presented to the user. */
    list_name?: string
  }
>

export type SegmentOrderSubmittedEvent = SegmentEvent<
  'Order Submitted',
  {
    /* Object that contains billing address properties */
    billing_address?: {
      /* 	First address line */
      address1?: string
      /* 	Second address line */
      address2?: string
      /* 	Billing city */
      city?: string
      /* 	Country */
      country?: string
      /* 	Billing first name */
      first_name?: string
      /* 	Billing last name */
      last_name?: string
      /* 	Billing phone number */
      phone?: string
      /* 	Billing state */
      state?: string
      /* 	Billing post code */
      zip?: string
    }
    /* If true: Buy online pickup in store. If false: Shipping */
    bopis?: boolean
    /* 	Id of the cart */
    cart_id?: string
    /* 	Name of the coupon */
    coupon?: string
    /* 	Currency code for the product. (i.e. CAD) */
    currency?: string
    /* 	Discount ($) amount received from a coupon */
    discount?: number
    /* 	Email provided by the customer */
    email?: string
    /* 	First name of the customer */
    first_name?: string
    /* 	Last name of the customer */
    last_name?: string
    /* 	Order/transaction ID */
    order_id?: string | number
    /* 	The phone number provided by the customer */
    phone?: string
    products?: {
      /* 	Brand associated with the product */
      brand?: string
      /* 	L1 category */
      category1?: string
      /* 	L2 category */
      category2?: string
      /* 	L3 category */
      category3?: string
      /* 	Image url of the product */
      image_url?: string
      /* 	Name of the product being viewed */
      name?: string
      /* 	Price ($) of the product being viewed */
      price?: number
      /* 	Database id of the product being viewed */
      product_id?: string | number
      /* 	Quantity of a product */
      quantity?: number
      /* 	The product's SKU number */
      sku?: string
      /* 	URL of the product page */
      url?: string
      /* 	Variant of the product */
      variant?: string
    }[]
    /* 	Total quantity of products */
    quantity?: number
    /* 	Shipping cost associated with the transaction */
    shipping?: number
    shipping_address?: {
      /* First address line */
      address1?: string
      /* Second address line */
      address2?: string
      /* City */
      city?: string
      /* Country */
      company?: string
      /* email */
      country?: string
      /* Shipping first name */
      first_name?: string
      /* Shipping last name */
      last_name?: string
      /* Shipping phone number */
      phone?: string
      /* Shipping state */
      state?: string
      /* Shipping post code */
      zip?: string
    }
    /* Sum of all products' price x quantity */
    subtotal?: number
    /* Total tax associated with the transaction */
    tax?: number
    /* Revenue with discounts and coupons added */
    total?: number
  }
>

export type SegmentProductListViewedEvent = SegmentEvent<
  'Product List Viewed',
  {
    /* The product list being viewed. */
    list_id?: string | number
    /* The name of the list in which the product was presented to the user. */
    list_name?: string
    products?: {
      /* Brand associated with the product */
      brand?: string
      /* L1 category */
      category1?: string
      /* L2 category */
      category2?: string
      /* L3 category */
      category3?: string
      /* Image url of the product. */
      image_url?: string
      /* Name of the product being viewed. */
      name?: string
      /* Position in the product list (ex. 3). */
      position?: number
      /* Database id of the product being viewed. */
      product_id?: string | number
      /* Quantity of a product. */
      quantity?: number
      /* The product's SKU number. */
      sku?: string
      /* URL of the product page. */
      url?: string
      /* Variant of the product. */
      variant?: string
    }[]
  }
>
