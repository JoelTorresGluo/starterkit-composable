export type GaEvent<Name = string, Params = any> = {
  name: Name
  params?: Params
}

/**
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events
 */
export type GaEventsCollection =
  | GaAddPaymentInfoEvent
  | GaAddShippingInfoEvent
  | GaAddToCartEvent
  | GaAddToWishlistEvent
  | GaBeginCheckoutEvent
  | GaEarnVirtualCurrencyEvent
  | GaGenerateLeadEvent
  | GaJoinGroupEvent
  | GaLevelEndEvent
  | GaLevelStartEvent
  | GaLevelUpEvent
  | GaLoginEvent
  | GaPostScoreEvent
  | GaPurchaseEvent
  | GaRefundEvent
  | GaRemoveFromCartEvent
  | GaSearchEvent
  | GaSelectContentEvent
  | GaSelectItemEvent
  | GaSelectPromotionEvent
  | GaShareEvent
  | GaSignUpEvent
  | GaSpendVirtualCurrencyEvent
  | GaTutorialBeginEvent
  | GaTutorialCompleteEvent
  | GaUnlockAchievementEvent
  | GaViewCartEvent
  | GaViewCartDrawerEvent
  | GaViewItemEvent
  | GaViewItemListEvent
  | GaViewPromotionEvent

/**
 * GaItemParams
 */
export interface GaItemParams {
  item_id: string
  item_name: string
  affiliation?: string
  coupon?: string
  currency?: string
  discount?: number
  index?: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_list_id?: string
  item_list_name?: string
  item_variant?: string
  location_id?: string
  price?: number
  quantity?: number
}

/**
 * Add Payment Info
 * This event signifies a user has submitted their payment information.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_payment_info_item
 */
export type GaAddPaymentInfoEvent = GaEvent<
  'add_payment_info',
  {
    currency: string
    value: number
    coupon?: string
    payment_type?: string
    items: GaItemParams[]
  }
>

/**
 * Add Shipping Info
 * This event signifies a user has submitted their shipping information.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_shipping_info
 */
export type GaAddShippingInfoEvent = GaEvent<
  'add_shipping_info',
  {
    currency: string
    value: number
    coupon?: string
    shipping_tier?: string
    items: GaItemParams[]
  }
>

/**
 * Add to Bag
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_cart
 */
export type GaAddToCartEvent = GaEvent<
  'add_to_cart',
  {
    currency: string
    value: number
    items: GaItemParams[]
  }
>

/**
 * Add to Wishlist
 * The event signifies that an item was added to a wishlist. Use this event to identify popular gift items in your app.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_wishlist
 */
export type GaAddToWishlistEvent = GaEvent<
  'add_to_wishlist',
  {
    currency: string
    value: number
    items: GaItemParams[]
  }
>

/**
 * Begin Checkout
 * This event signifies that a user has begun a checkout.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout
 */
export type GaBeginCheckoutEvent = GaEvent<
  'begin_checkout',
  {
    currency: string
    value: number
    coupon?: string
    items: GaItemParams[]
  }
>

/**
 * Earn Virtual Currency
 * This event measures the awarding of virtual currency.
 * Log this along with spend_virtual_currency to better understand your virtual economy.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#earn_virtual_currency
 */
export type GaEarnVirtualCurrencyEvent = GaEvent<
  'earn_virtual_currency',
  {
    virtual_currency_name?: string
    value?: number
  }
>

/**
 * Generate Lead
 * Log this event when a lead has been generated to understand the efficacy of your re-engagement campaigns.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead
 */
export type GaGenerateLeadEvent = GaEvent<
  'generate_lead',
  {
    currency: string
    value: number
  }
>

/**
 * Join Group
 * Log this event when a user joins a group such as a guild, team, or family.
 * Use this event to analyze how popular certain groups or social features are.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#join_group
 */
export type GaJoinGroupEvent = GaEvent<
  'join_group',
  {
    group_id?: string
  }
>

/**
 * Level End
 * This event signifies that a player has reached the end of a level.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#level_end
 */
export type GaLevelEndEvent = GaEvent<
  'level_end',
  {
    level_name?: string
    success?: boolean
  }
>

/**
 * Level Start
 * This event signifies that a player has started a level.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#level_start
 */
export type GaLevelStartEvent = GaEvent<
  'level_start',
  {
    level_name?: string
  }
>

/**
 * Level Up
 * This event signifies that a player has leveled up.
 * Use it to gauge the level distribution of your userbase and identify levels that are difficult to complete.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#level_up
 */
export type GaLevelUpEvent = GaEvent<
  'level_up',
  {
    level?: number
    character?: boolean
  }
>

/**
 * Login
 * Send this event to signify that a user has logged in.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#login
 */
export type GaLoginEvent = GaEvent<
  'login',
  {
    method?: string
  }
>

/**
 * Post Score
 * Send this event when the user posts a score.
 * Use this event to understand how users are performing in your game and correlate high scores with audiences or behaviors.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#post_score
 */
export type GaPostScoreEvent = GaEvent<
  'post_score',
  {
    score: number
    level?: number
    character?: string
  }
>

/**
 * Purchase
 * This event signifies when one or more items is purchased by a user.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase
 */
export type GaPurchaseEvent = GaEvent<
  'purchase',
  {
    currency: string
    transaction_id: string
    value: number
    affiliation?: string
    coupon?: string
    shipping?: number
    tax?: number
    items: GaItemParams[]
  }
>

/**
 * Refund
 * This event signifies a refund was issued.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#refund
 */
export type GaRefundEvent = GaEvent<
  'refund',
  {
    currency: string
    transaction_id: string
    value: number
    affiliation?: string
    coupon?: string
    shipping?: number
    tax?: number
    items?: GaItemParams[]
  }
>

/**
 * Remove from Cart
 * This event signifies that an item was removed from a cart.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#remove_from_cart
 */
export type GaRemoveFromCartEvent = GaEvent<
  'remove_from_cart',
  {
    currency: string
    value: number
    items: GaItemParams[]
  }
>

/**
 * Search
 * Use this event to contextualize search operations.
 * This event can help you identify the most popular content in your app.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#search
 */
export type GaSearchEvent = GaEvent<
  'search',
  {
    search_term: string
  }
>

/**
 * Select Content
 * This event signifies that a user has selected some content of a certain type.
 * This event can help you identify popular content and categories of content in your app.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_content
 */
export type GaSelectContentEvent = GaEvent<
  'select_content',
  {
    content_type?: string
    item_id?: string
  }
>

/**
 * Select Item
 * This event signifies an item was selected from a list.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_item
 */
export type GaSelectItemEvent = GaEvent<
  'select_item',
  {
    item_list_id?: string
    item_list_name?: string
    items: GaItemParams[]
  }
>

/**
 * Select Promotion
 * This event signifies a promotion was selected from a list.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_promotion
 */
export type GaSelectPromotionEvent = GaEvent<
  'select_promotion',
  {
    creative_name?: string
    creative_slot?: string
    location_id?: string
    promotion_id?: string
    promotion_name?: string
    items?: GaItemParams[]
  }
>

/**
 * Share
 * Use this event when a user has shared content.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#share
 */
export type GaShareEvent = GaEvent<
  'share',
  {
    method?: string
    content_type?: string
    item_id?: string
  }
>

/**
 * Sign Up
 * This event indicates that a user has signed up for an account.
 * Use this event to understand the different behaviors of logged in and logged out users.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#sign_up
 */
export type GaSignUpEvent = GaEvent<
  'sign_up',
  {
    method?: string
  }
>

/**
 * Spend Virtual Currency
 * This event measures the sale of virtual goods in your app and helps you identify which virtual goods are the most popular.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#spend_virtual_currency
 */
export type GaSpendVirtualCurrencyEvent = GaEvent<
  'spend_virtual_currency',
  {
    value: number
    virtual_currency_name: string
    item_name?: string
  }
>

/**
 * Tutorial Begin
 * This event signifies the start of the on-boarding process.
 * Use this in a funnel with tutorial_complete to understand how many users complete the tutorial.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#tutorial_begin
 */
export type GaTutorialBeginEvent = GaEvent<'tutorial_begin', {}>

/**
 * Tutorial Complete
 * This event signifies the user's completion of your on-boarding process.
 * Use this in a funnel with tutorial_begin to understand how many users complete the tutorial.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#tutorial_complete
 */
export type GaTutorialCompleteEvent = GaEvent<'tutorial_complete', {}>

/**
 * Unlock Achievement
 * Log this event when the user has unlocked an achievement.
 * This event can help you understand how users are experiencing your game.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#unlock_achievement
 */
export type GaUnlockAchievementEvent = GaEvent<
  'unlock_achievement',
  {
    achievement_id: string
  }
>

/**
 * View Cart
 * This event signifies that a user viewed their cart.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_cart
 */
export type GaViewCartEvent = GaEvent<
  'view_cart',
  {
    currency: string
    value: number
    items: GaItemParams[]
  }
>

/**
 * View Cart Drawer
 * This event signifies that a user viewed their cart using the drawer.
 */
export type GaViewCartDrawerEvent = GaEvent<
  'view_cart_drawer',
  GaViewCartEvent['params']
>

/**
 * View Item
 * This event signifies that some content was shown to the user.
 * Use this event to discover the most popular items viewed.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item
 */
export type GaViewItemEvent = GaEvent<
  'view_item',
  {
    currency: string
    value: number
    items: GaItemParams[]
  }
>

/**
 * View Item List
 * Log this event when the user has been presented with a list of items of a certain category.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item_list
 */
export type GaViewItemListEvent = GaEvent<
  'view_item_list',
  {
    item_list_id?: string | string
    item_list_name?: string | number
    items: GaItemParams[]
  }
>

/**
 * View Promotion
 * This event signifies a promotion was viewed from a list.
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_promotion
 */
export type GaViewPromotionEvent = GaEvent<
  'view_promotion',
  {
    creative_name?: string
    creative_slot?: string
    location_id?: string
    promotion_id?: string
    promotion_name?: string
    items: GaItemParams[]
  }
>
