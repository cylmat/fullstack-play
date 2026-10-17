# Inventory Management System — Sample Specification

## 1. Product overview

A web application for small retailers to track product quantities, manage stock across locations, and reorder products before they run out.

- **Primary users:** Store owner, inventory manager, and stockroom staff
- **Platforms:** Responsive web application; optimized for desktop and tablet
- **Primary goal:** Maintain accurate stock counts and make replenishment straightforward
- **MVP scope:** One company with one or more warehouses or retail locations

## 2. MVP scope

### Product catalog

- Create, view, edit, archive, and search products.
- Store product name, SKU, optional barcode, description, unit of measure, cost, selling price, supplier, and reorder threshold.
- Require a unique SKU within the company.
- Show current on-hand, reserved, and available quantities for each location.
- Prevent deleting products that have stock history; allow archiving instead.

### Stock overview

- Display total on-hand, low-stock, out-of-stock, and pending-purchase-order counts.
- Filter inventory by location, category, supplier, and stock status.
- Search by product name, SKU, or barcode.
- Show when stock data was last updated.
- Define available stock as on-hand quantity minus reserved quantity.

### Stock movements

- Record every quantity change as a dated, attributable movement.
- Support receiving, shipment, return, transfer, and manual adjustment movement types.
- Require a reason for manual adjustments.
- Require source and destination locations for transfers.
- Show a product's movement history, including quantity before and after the movement.
- Do not allow a movement to result in negative available stock unless an authorized manager explicitly permits backorders.

### Suppliers and purchasing

- Maintain supplier name, contact details, and lead time.
- Create purchase orders with supplier, destination location, expected arrival date, and product quantities.
- Track purchase orders as Draft, Submitted, Partially Received, Received, or Cancelled.
- Receive all or part of a purchase order and update inventory only for the quantities received.
- Prevent receiving quantities greater than the outstanding quantity unless a manager confirms the overage.
- Keep received purchase-order lines and stock movements linked for auditability.

### Alerts

- Flag products at or below their configured reorder threshold.
- Show low-stock and out-of-stock alerts on the overview.
- Allow optional email notifications for low-stock items.
- Avoid sending repeated alerts for the same product while it remains continuously below threshold.

## 3. Main screens and navigation

1. **Sign in:** Email and password, with password reset.
2. **Overview:** Inventory KPIs, low-stock alerts, and recent movements.
3. **Products:** Searchable catalog and product details.
4. **Inventory:** Quantities by location and movement history.
5. **Purchase orders:** Purchase-order list, creation, details, and receiving workflow.
6. **Suppliers:** Supplier list and supplier details.
7. **Settings:** Locations, users and roles, reorder defaults, and notification preferences.

Use persistent navigation for Overview, Products, Inventory, and Purchase Orders. Keep the current location filter when moving between inventory screens.

## 4. Roles and permissions

- **Owner:** Full access, including users, locations, settings, and all inventory operations.
- **Manager:** Manage products, purchase orders, stock movements, and reports for assigned locations.
- **Staff:** View assigned-location inventory and record receiving or transfers; cannot change users, settings, or cost data.
- Enforce permissions on the server for every read and write operation, not only by hiding interface controls.

## 5. Functional requirements

- Each inventory movement must identify the user, timestamp, movement type, product, quantity, and affected location.
- Movement quantities must be positive; movement type determines whether stock is added or removed.
- Transfers must be atomic: stock is deducted from the source and added to the destination as one operation.
- Receiving a purchase order in multiple shipments must retain the received quantity and outstanding balance per line.
- Retrying a timed-out write must not duplicate a movement or receipt.
- Concurrent changes must not silently overwrite newer stock quantities.
- Display validation errors next to the relevant input and explain rejected operations.
- Show explicit loading, empty, offline, and error states; never present stale stock as current without indicating its last update.
- Store quantities using the product's unit of measure and support fractional quantities only where that unit allows them.

## 6. Sample data model

- **Product:** `id`, `sku`, `name`, `barcode`, `categoryId`, `unitOfMeasure`, `unitCost`, `sellingPrice`, `supplierId`, `reorderThreshold`, `archivedAt`
- **Location:** `id`, `name`, `address`, `isActive`
- **Inventory balance:** `productId`, `locationId`, `onHand`, `reserved`, `updatedAt`
- **Stock movement:** `id`, `productId`, `movementType`, `quantity`, `sourceLocationId`, `destinationLocationId`, `reason`, `referenceId`, `createdBy`, `createdAt`
- **Supplier:** `id`, `name`, `email`, `phone`, `leadTimeDays`
- **Purchase order:** `id`, `orderNumber`, `supplierId`, `destinationLocationId`, `status`, `createdAt`, `expectedAt`, `createdBy`
- **Purchase-order line:** `purchaseOrderId`, `productId`, `orderedQuantity`, `receivedQuantity`, `unitCost`
- **User membership:** `userId`, `companyId`, `role`, `locationIds[]`

Use a durable movement ledger as the audit record. Inventory balances may be maintained for fast reads, but must remain consistent with committed movements.

## 7. Quality and security requirements

- Support current versions of major desktop and tablet browsers.
- Make tables usable at narrow widths with clear responsive layouts and keyboard navigation.
- Meet WCAG-aligned color contrast and provide labels that do not rely on color alone for stock status.
- Use HTTPS and secure session handling.
- Restrict company and location data by the authenticated user's permissions.
- Do not expose supplier contacts or unit costs to staff roles that lack permission.
- Record an audit trail for inventory adjustments, purchase-order changes, and permission changes.
- Back up inventory and movement data and provide a documented recovery process.

## 8. Acceptance criteria

- Creating a product with a duplicate company SKU is rejected with a clear validation message.
- Receiving a purchase order updates the destination location by exactly the received quantity and records linked stock movements.
- Partial receipts leave the purchase order open with the correct outstanding quantities.
- A transfer changes source and destination balances together; it cannot update only one side.
- A manual adjustment requires a reason and appears in the product's movement history with the acting user.
- Products at or below their reorder threshold appear in low-stock results for the correct location.
- A staff member cannot view restricted costs or make changes outside assigned locations, including through direct API requests.
- Repeating a write request after a network timeout does not duplicate stock or purchase-order receipts.

## 9. Out of scope for MVP

- Automated supplier ordering and electronic data interchange
- Demand forecasting and AI-generated replenishment plans
- Accounting, invoicing, and payment processing
- Serial-number and lot/batch tracking
- Barcode scanning through a native mobile application
- Marketplace integrations and live synchronization with external storefronts
