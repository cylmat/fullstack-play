# Android E-commerce Dashboard — Sample Specification

## 1. Product overview

An Android application that lets small online-store owners monitor store performance and handle essential daily operations from a phone.

- **Primary user:** Store owner or store manager
- **Platform:** Android phones and tablets
- **MVP language:** English
- **MVP currency:** Configurable per store; default USD
- **Primary goal:** Quickly understand sales and act on pending orders

## 2. MVP scope

### Dashboard

- Show gross sales, order count, average order value, and refunds for a selected period.
- Provide period filters: Today, 7 days, 30 days, and custom date range.
- Display a sales-over-time chart and an order-status summary.
- Show recent orders and highlight orders awaiting action.
- Clearly show the selected store, time zone, currency, and last data refresh time.

### Orders

- List orders with search and filters for date, payment status, and fulfillment status.
- Show order number, customer, date, total, payment status, and fulfillment status.
- Open an order detail view with line items, totals, shipping details, and customer contact information.
- Allow authorized users to mark an order as fulfilled and add a tracking number.
- Require confirmation before cancelling an order; record the cancellation reason.

### Products

- List products with name, SKU, price, and inventory status.
- Search by product name or SKU.
- Show low-stock products using a store-configurable threshold.
- MVP is read-only for product details and inventory.

### Notifications

- Provide optional push notifications for new orders and low-stock products.
- Let users enable or disable each notification type in settings.
- Tapping a notification opens the relevant order or product.

## 3. Main screens and navigation

1. **Sign in:** Email and password, with a password-reset link.
2. **Dashboard:** KPI cards, date filter, sales chart, order summary, and recent orders.
3. **Orders:** Searchable, filterable order list and order detail.
4. **Products:** Searchable product list and stock indicators.
5. **Settings:** Store selection, notification preferences, currency/time-zone display, and sign out.

Use a bottom navigation bar for Dashboard, Orders, Products, and Settings. Preserve the chosen date range while navigating during the current session.

## 4. Functional requirements

- Users must authenticate before accessing store information.
- A user can only access stores and data they are authorized to see.
- Dashboard metrics must respect the selected store and date range.
- Revenue values must use the store currency and locale-aware formatting.
- Dates and times must display in the store's configured time zone.
- Loading, empty, offline, and error states must be shown explicitly; stale data must display its last refresh time.
- Retrying a failed request must not create duplicate order actions.
- Destructive actions, such as cancelling an order, require confirmation.

## 5. Data model (sample)

- **Store:** `id`, `name`, `currency`, `timeZone`, `lowStockThreshold`
- **Order:** `id`, `orderNumber`, `createdAt`, `customerName`, `total`, `currency`, `paymentStatus`, `fulfillmentStatus`, `items[]`, `shippingAddress`, `trackingNumber`
- **Order item:** `productId`, `productName`, `sku`, `quantity`, `unitPrice`
- **Product:** `id`, `name`, `sku`, `price`, `currency`, `inventoryQuantity`
- **Dashboard summary:** `periodStart`, `periodEnd`, `grossSales`, `orderCount`, `averageOrderValue`, `refundTotal`, `salesSeries[]`, `orderStatusCounts`

Amounts should be represented in the smallest currency unit (for example, cents) in APIs and formatted for display by the app.

## 6. Quality and security requirements

- Support Android 10 (API 29) and later.
- Adapt layouts to phone and tablet screen sizes and support portrait orientation.
- Keep dashboard and order-list content readable with Android font scaling enabled.
- Meet WCAG-aligned contrast targets and provide accessible names for controls and chart summaries.
- Use HTTPS for all network traffic and secure platform storage for authentication tokens.
- Do not log passwords, access tokens, payment credentials, or full shipping addresses.
- Respect Android notification permissions and allow users to revoke notification preferences.
- Provide a useful offline message and prevent unsupported write actions when disconnected.

## 7. Acceptance criteria

- An authorized user can sign in and see dashboard data for the selected store.
- Changing the date range updates all dashboard KPIs, chart values, and order counts together.
- Selecting a recent order opens details that match the order list.
- A user can fulfill an eligible order once; repeated taps do not duplicate the action.
- An unauthorized user cannot view another store's dashboard, orders, or products.
- Empty, offline, loading, and server-error states are distinguishable and offer an appropriate next step.
- Currency and dates are displayed using the configured store settings.
