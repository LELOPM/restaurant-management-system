**SOFTWARE REQUIREMENTS SPECIFICATION**

**Restaurant Management System — Phase 1 (MVP)**

**Prepared for:  **[Restaurant / Client Name]

**Prepared by:  **[Your Name / Company Name]

**Date:  **July 4, 2026

**Document Version:  **1.0 (Draft for Approval)

*This document defines the agreed scope of work for Phase 1 of the Restaurant Management System. Once signed, it forms the basis for design, development, and acceptance testing.*

# **Table of Contents**

# **1. Introduction**

## **1.1 Purpose**

This Software Requirements Specification (SRS) defines the functional and business requirements for Phase 1 (the MVP) of the Restaurant Management System. It exists to remove ambiguity about what will be built, so that both the client and the developer agree on scope before design and development begin. Once approved, this document is the reference used to build the system and to evaluate whether it has been delivered correctly.

## **1.2 Scope**

This document covers the eleven modules of Phase 1: Authentication & Role Management, Digital Menu Management, Table Management, Order Management, Kitchen Display System, Billing, Inventory, Employee Accountability, Approval Workflow, Reports Dashboard, and Customer History. Features explicitly deferred to a later version are listed in Section 11 and are out of scope for this phase.

## **1.3 Definitions and Acronyms**

- MVP — Minimum Viable Product: the smallest version of the system that solves the client's core operational problems.

- SRS — Software Requirements Specification: this document.

- FR — Functional Requirement, numbered per module (e.g., FR-4.2).

- BR — Business Rule, a constraint the system must always enforce.

- RBAC — Role-Based Access Control: restricting features by user role.

- POS — Point of Sale, the billing/payment part of the system.

## **1.4 Intended Audience**

This document is written for two audiences: the restaurant owner/manager, who is approving the scope and budget, and the development team, who will build against these requirements. Section language is kept as non-technical as possible while remaining precise enough to build from.

# **2. Business Objectives**

The restaurant is not buying software — it is buying a solution to three operational problems: communication delays between waiter, kitchen, and cashier; inventory loss from theft, waste, and shortages; and a lack of employee accountability. Every module in this document exists to serve one of these objectives.

**BO-1 — Eliminate communication delays.**  Replace verbal and paper-based communication between waiter, kitchen, and cashier with a single real-time digital order flow, so orders move through the restaurant without being shouted, walked over, or forgotten.

**BO-2 — Reduce inventory loss.**  Reduce loss from theft, waste, and stock shortages by automatically deducting ingredients from stock based on recipes every time an item is sold, and by giving managers real-time visibility into stock levels.

**BO-3 — Establish employee accountability.**  Make every action in the system traceable to a specific employee account, and require manager approval for sensitive actions (voids, discounts, price changes), so responsibility is never ambiguous.

**BO-4 — Provide real-time operational visibility.**  Give the owner and manager live dashboards and reports on sales, inventory, and staff activity, replacing manual, after-the-fact monitoring.

## **2.1 Business Value Summary**

| **Current Situation** | **After the System** |
| --- | --- |
| Orders communicated verbally | Orders appear instantly on the kitchen display |
| Paper captain orders | Fully digital order flow |
| Manual stock tracking | Automatic inventory deduction based on recipes |
| Difficult to identify responsibility | Every action is linked to an employee account |
| Limited visibility into sales | Real-time dashboards and reports |
| Manager manually monitors operations | System-generated alerts and audit trails |

# **3. User Roles and Permissions**

The system supports six roles. A user's role determines which screens they can open and which actions they can perform; this is enforced by the system, not left to convention.

## **3.1 Role Summary**

| **Role** | **Permissions** |
| --- | --- |
| Owner | Full access to every module, all dashboards, all reports, and employee management. |
| Manager | Menu management, inventory, reports, void/discount/price-change approval, employee oversight. |
| Cashier | Billing, order confirmation, fiscal reference entry, payment processing. |
| Kitchen | Kitchen display access; mark orders Preparing and Ready. |
| Waiter | Create orders, view own orders, select tables. |
| Accountant | Read-only access to reports. |

## **3.2 Module Access Matrix**

*"**Full**"** indicates create/edit/delete access. **"**View**"** indicates read-only access. **"**Approve**"** and **"**Request**"** describe the two sides of the approval workflow (Module 9). **"**-**"** indicates no access.*

| **Module** | **Owner** | **Manager** | **Cashier** | **Waiter** | **Kitchen** | **Accountant** |
| --- | --- | --- | --- | --- | --- | --- |
| Authentication & Roles | Full | Full | Full | Full | Full | Full |
| Menu Management | Full | Full | View | View | - | - |
| Table Management | Full | Full | View | Full | - | - |
| Order Management | View | View | View | Full | View | - |
| Kitchen Display | View | View | View | - | Full | - |
| Billing | View | View | Full | - | - | - |
| Inventory | Full | Full | - | - | - | - |
| Employee Activity Logs | Full | View | - | - | - | - |
| Approval Workflow | Full | Approve | Request | Request | - | - |
| Reports & Dashboards | Full | Full | View | - | View | View |
| Customer History | Full | Full | Full | - | - | - |

# **4. Functional Requirements**

Requirements are grouped by module and numbered for traceability (e.g., FR-7.3 refers to the third requirement of Module 7). Each "shall" statement is a testable requirement the delivered system must satisfy.

### **Module 1 — Authentication ****&**** Role Management**

*Every user must log in before using the system, and every screen and action is restricted according to the six defined roles.*

- FR-1.1 The system shall require every user to log in with valid credentials before accessing any feature.

- FR-1.2 The system shall support six roles: Owner, Manager, Cashier, Waiter, Kitchen, and Accountant.

- FR-1.3 The system shall enforce role-based access control, restricting each user to the modules and actions defined in Section 3.

- FR-1.4 The system shall prevent a user from accessing or invoking a module or action outside their assigned role's permissions, including via direct navigation.

### **Module 2 — Digital Menu Management**

*The Manager maintains the menu without developer involvement.*

- FR-2.1 The Manager shall be able to add a new product with name, price, category, image, preparation time, and ingredient list.

- FR-2.2 The Manager shall be able to edit an existing product's details.

- FR-2.3 The Manager shall be able to disable a product without deleting its historical order data.

- FR-2.4 The Manager shall be able to change a product's price.

- FR-2.5 The system shall support product categories, combos, variations, and add-ons.

### **Module 3 — Table Management**

*Waiters work from a visual map of the restaurant floor rather than memory.*

- FR-3.1 The system shall display a visual layout of restaurant tables.

- FR-3.2 Each table shall show one of three statuses: Available, Occupied, or Reserved.

- FR-3.3 A table's status shall automatically change to Occupied when a waiter creates an order for it, and return to Available when the order is completed.

- FR-3.4 A waiter shall select a table before creating a new order.

### **Module 4 — Order Management (Core)**

*This is the heart of the system: the digital replacement for shouted or handwritten orders. See Section 8 for the visual process flow.*

- FR-4.1 A waiter shall be able to create a new order for a selected table.

- FR-4.2 The system shall transmit new orders to the Kitchen Display in real time, without requiring a manual refresh.

- FR-4.3 A waiter shall be able to edit an order, cancel an order, split items, add special notes, set multiple quantities, and add add-ons.

- FR-4.4 Every order shall have exactly one status at a time: Pending, Preparing, Ready, Completed, or Cancelled.

- FR-4.5 The system shall update order status automatically as the order moves through the kitchen-cashier-waiter workflow.

- FR-4.6 Cancelling an order shall follow the approval rules defined in Module 9.

### **Module 5 — Kitchen Display System**

*Replaces paper captain orders with a live screen in the kitchen.*

- FR-5.1 The Kitchen shall view all pending orders on a tablet or screen, showing table number, items, quantities, and special notes.

- FR-5.2 Kitchen staff shall be able to mark an order Preparing and then Ready with a single action.

- FR-5.3 When an order is marked Ready, the Cashier's view shall update immediately, without the Cashier needing to walk to the kitchen or ask.

### **Module 6 — Billing**

*The billing module records payment without integrating directly into the restaurant**'**s fiscal device.*

- FR-6.1 The Cashier shall be able to view completed/ready orders awaiting payment.

- FR-6.2 The Cashier shall be able to select a payment method: Cash, Telebirr, CBE, or Bank. Mixed payment is a Version 2 feature.

- FR-6.3 The system shall store the fiscal receipt number, payment type, and payment timestamp for every completed transaction.

- FR-6.4 The billing module shall remain independent of the restaurant's fiscal printer; the fiscal reference number is recorded, not generated, by the system.

### **Module 7 — Inventory**

*One of the system**'**s biggest sources of value: stock updates itself instead of relying on manual counts.*

- FR-7.1 The Manager shall be able to define ingredients, including name, unit of measure, and current stock.

- FR-7.2 The Manager shall be able to define a recipe (ingredient list and quantities) for each menu item.

- FR-7.3 The system shall automatically deduct recipe ingredient quantities from stock whenever the linked menu item is sold.

- FR-7.4 The system shall flag ingredients as Low Stock or Out of Stock based on Manager-defined thresholds.

- FR-7.5 The Manager shall be able to view current stock, stock movement history, and perform manual stock adjustments.

- FR-7.6 Every manual stock adjustment shall require a reason to be entered before it is saved.

### **Module 8 — Employee Accountability**

*Every state-changing action is tied to a person, permanently.*

- FR-8.1 The system shall log every state-changing action (order created, confirmed, marked ready, voided, etc.) with the responsible user, timestamp, and action type.

- FR-8.2 Activity log entries shall be immutable; no role, including Owner, shall be able to edit or delete a log entry.

- FR-8.3 The Manager and Owner shall be able to view activity logs filtered by employee, date, or action type.

### **Module 9 — Approval Workflow**

*Sensitive actions require a manager**'**s explicit sign-off, every time. See Section 8, Diagram 4.*

- FR-9.1 The system shall require Manager password confirmation before executing a void, price change, discount, or special/family order.

- FR-9.2 Every approval action shall be logged with the approving Manager's identity, reason, and timestamp.

- FR-9.3 An action requiring approval shall be blocked if the Manager password is not provided or is incorrect.

### **Module 10 — Reports Dashboard**

*Each role gets a dashboard scoped to what they need to see and act on.*

- FR-10.1 The Owner dashboard shall display: today's sales, orders today, top-selling items, average order value, monthly revenue, inventory value, low stock alerts, and an employee activity summary.

- FR-10.2 The Manager dashboard shall display: pending orders, kitchen status, inventory alerts, voids, refunds, and employee activity.

- FR-10.3 The Cashier dashboard shall display: today's transactions, completed orders, and pending payments.

- FR-10.4 The Kitchen dashboard shall display orders grouped by status: Preparing, Ready, Completed.

- FR-10.5 The system shall generate the following reports: Daily, Weekly, and Monthly Sales; Best and Worst Sellers; Inventory; Employee Activity; Void Report; Discount Report; Special Order Report.

- FR-10.6 All reports shall be exportable to PDF and Excel formats.

### **Module 11 — Customer History (Simple MVP)**

*A lightweight record of who orders, not a loyalty program.*

- FR-11.1 The system shall allow a Cashier or Manager to save a customer record with phone number (required) and name (optional).

- FR-11.2 The Manager or Cashier shall be able to search for a customer by phone number.

- FR-11.3 A customer record shall display order history, total visits, and total amount spent.

- FR-11.4 The system shall not include loyalty points, tiers, or rewards in the MVP; see Section 10.

# **5. User Stories**

User stories describe the core journeys for each role in plain language. They complement, rather than replace, the functional requirements in Section 4.

### **Owner**

- As an Owner, I want a real-time dashboard of today's sales and top-selling items, so that I can make decisions without asking staff for updates.

- As an Owner, I want to see employee activity logs, so that I can identify who is responsible for any discrepancy.

- As an Owner, I want inventory value and low-stock alerts on my dashboard, so that I can act before the restaurant runs out of key ingredients.

### **Manager**

- As a Manager, I want to add and edit menu items, prices, and recipes myself, so that the menu stays accurate without developer involvement.

- As a Manager, I want to approve voids, discounts, and price changes with my password, so that no staff member can alter a bill without my knowledge.

- As a Manager, I want to view stock levels and adjust them manually with a reason, so that I can correct discrepancies found during physical counts.

### **Cashier**

- As a Cashier, I want to see an order the moment the kitchen marks it Ready, so that I don't have to walk to the kitchen to check.

- As a Cashier, I want to record the payment method and fiscal receipt number for every order, so that transactions are properly documented.

### **Waiter**

- As a Waiter, I want to select a table and create an order digitally, so that I don't have to carry a paper ticket to the kitchen.

- As a Waiter, I want to see the status of my own orders, so that I know exactly when to serve a table.

### **Kitchen**

- As Kitchen staff, I want new orders to appear instantly on a screen, so that I don't rely on shouted or handwritten tickets.

- As Kitchen staff, I want to mark an order Ready with one tap, so that the cashier and waiter are notified immediately.

### **Accountant**

- As an Accountant, I want read-only access to sales, inventory, and employee reports, so that I can prepare financial statements without being able to alter operational data.

# **6. Business Rules**

These rules apply system-wide and take precedence over any individual screen behavior. Where a business rule and a feature request conflict during development, the business rule wins unless this document is formally amended.

- BR-1: Every user must log in with unique credentials; access is restricted strictly by assigned role.

- BR-2: A table's status must always reflect Available, Occupied, or Reserved, and updates automatically as orders open and close.

- BR-3: Orders move through a fixed lifecycle: Pending → Preparing → Ready → Completed. An order may only move to Cancelled before it is Completed, and only with Manager approval.

- BR-4: Void, price change, discount, and special/family order actions always require Manager password approval. There are no exceptions in the MVP.

- BR-5: Every approval and every state-changing action is permanently logged and cannot be edited or deleted by any role, including Manager or Owner.

- BR-6: Selling a menu item automatically deducts its recipe ingredients from inventory. Manual stock changes always require a stated reason.

- BR-7: The billing module records payment type and fiscal reference number but does not integrate directly with the fiscal printer in the MVP.

- BR-8: A customer is uniquely identified by phone number; name is optional.

- BR-9: Reports are generated from transactional data and must be exportable in both PDF and Excel formats.

# **7. Screen-by-Screen Descriptions**

This is a functional description of each screen, not a visual design. Layout, colors, and exact placement are decided during the UI/UX design phase that follows approval of this document.

| **Screen** | **Access Role(s)** | **Key Elements** | **Primary Actions** |
| --- | --- | --- | --- |
| Login Screen | All roles | Username / password fields; role detected automatically from the account. | Log in. |
| Table Layout Screen | Waiter, Manager, Owner | Visual grid of tables, color-coded by status (Available / Occupied / Reserved). | Select a table; start a new order. |
| Order Creation Screen | Waiter | Menu by category, quantity selector, add-ons, special notes field, split-item option. | Add items; submit order to kitchen. |
| My Orders Screen | Waiter | List of the waiter's active orders with live status badges. | View status; mark a table as served. |
| Kitchen Display Screen | Kitchen | One card per order: table number, items, quantities, notes, elapsed time. | Mark order Preparing, then Ready. |
| Billing / Payment Screen | Cashier | Order summary, payment method selector, fiscal reference field. | Confirm payment; record receipt. |
| Cashier Dashboard | Cashier | Today's transactions, completed orders, pending payments. | Jump to billing for a specific order. |
| Menu Management Screen | Manager | List of products with edit / disable controls; category, combo, and add-on management. | Add, edit, or disable a product. |
| Inventory Management Screen | Manager | Ingredient list with stock levels and low-stock indicators. | Adjust stock (reason required); define recipes. |
| Approval Prompt | Manager (triggered by any role) | Password field and reason field, shown as a modal over the triggering action. | Approve or deny the restricted action. |
| Manager Dashboard | Manager | Pending orders, kitchen status, inventory alerts, voids/refunds, employee activity. | Drill into any widget for detail. |
| Owner Dashboard | Owner | Sales summary, top sellers, revenue, inventory value, low stock, employee activity. | Drill into any widget; export reports. |
| Reports Screen | Owner, Manager, Accountant | Report type selector and date range filter. | Generate and export a report to PDF or Excel. |
| Customer Lookup Screen | Cashier, Manager | Phone number search field; results show name, order history, visits, total spent. | Search a customer; register a new one. |
| Employee Activity Log Screen | Manager, Owner | Chronological, filterable log of every logged action. | Filter by employee, date, or action type. |

# **8. Process Flow Diagrams**

The four diagrams below illustrate the core system flows described in Sections 4 and 6.

## **8.1 Core Order Lifecycle**

The end-to-end path of a single order, from the moment a waiter opens a table to the moment payment is completed. This is the workflow Module 4 and Module 5 exist to support.

*Diagram 1 — Core order lifecycle, waiter through payment.*

## **8.2 Order Status State Diagram**

Every order is always in exactly one of five states. This diagram shows every legal transition; any transition not shown here is not permitted by the system.

*Diagram 2 — Legal order status transitions.*

## **8.3 Automatic Inventory Deduction**

What happens in the background, invisibly to staff, every time a menu item is sold. This is the mechanism behind Module 7 and directly serves Business Objective BO-2.

*Diagram 3 — Recipe-based stock deduction on sale.*

## **8.4 Manager Approval Workflow**

The gate that every void, discount, price change, or special order must pass through, per Module 9 and Business Rule BR-4.

*Diagram 4 — Manager approval gate for restricted actions.*

# **9. Database Entities**

This is a logical data model, not a physical schema — exact column types and indexes are finalized during development. It exists so both parties agree on what information the system will store.

| **Entity** | **Description** | **Key Attributes** | **Related To** |
| --- | --- | --- | --- |
| Users | System accounts for staff. | id, name, phone/username, password hash, role_id, status | Roles, Activity Logs, Orders |
| Roles | The six defined role types. | id, name | Users, Permissions |
| Permissions | Maps a role to its allowed modules and access level. | id, role_id, module, access_level | Roles |
| Tables | Physical restaurant tables. | id, table_number, status | Orders |
| Menu Categories | Groupings for menu items. | id, name | Menu Items |
| Menu Items | Sellable products. | id, name, price, category_id, prep_time, image_url, status | Menu Categories, Recipes, Order Items |
| Item Variations | Size or type variants of a menu item. | id, item_id, name, price_delta | Menu Items |
| Combos | Bundled menu items sold as one product. | id, name, price, item_ids | Menu Items |
| Ingredients | Raw stock components. | id, name, unit, current_stock, threshold | Recipes, Stock Adjustments |
| Recipes | Ingredient quantities required per menu item. | id, item_id, ingredient_id, quantity | Menu Items, Ingredients |
| Inventory | Current stock snapshot per ingredient. | ingredient_id, quantity_on_hand, last_updated | Ingredients |
| Stock Adjustments | Manual stock corrections with a required reason. | id, ingredient_id, quantity_delta, reason, user_id, timestamp | Ingredients, Users |
| Orders | Customer orders placed by a waiter. | id, table_id, waiter_id, customer_id, status, created_at | Tables, Users, Order Items, Payments, Customers |
| Order Items | Line items within an order. | id, order_id, item_id, quantity, notes, addons | Orders, Menu Items |
| Kitchen Queue | Orders visible to the kitchen with prep status. | order_id, status, updated_at | Orders |
| Payments | Payment transactions. | id, order_id, method, amount, fiscal_reference, paid_at | Orders |
| Fiscal References | Fiscal receipt numbers linked to payments. | id, payment_id, reference_number | Payments |
| Customers | Customer records for order history. | id, phone_number, name, total_visits, total_spent | Orders |
| Activity Logs | Immutable audit trail of every state-changing action. | id, user_id, action_type, entity_affected, reason, timestamp | Users |

# **10. Acceptance Criteria**

These are the concrete, checkable conditions used to confirm the MVP satisfies Section 2's business objectives before final sign-off and payment.

| **ID** | **Area** | **The MVP is accepted when...** |
| --- | --- | --- |
| AC-1 | Order Flow | An order created by a Waiter appears on the Kitchen Display without manual refresh, and appears as Ready on the Cashier's view immediately after the kitchen marks it so. |
| AC-2 | Inventory | Selling a menu item automatically reduces the stock of every ingredient in its recipe by the correct quantity, and a Low Stock alert appears on the Manager dashboard when a threshold is crossed. |
| AC-3 | Accountability | Every void, price change, discount, or cancellation is blocked unless a valid Manager password is entered, and is recorded in the Activity Log with user, reason, and timestamp. |
| AC-4 | Billing | A completed order records payment method, fiscal reference number, and payment time, and is reflected in the Cashier and Owner dashboards the same day. |
| AC-5 | Reports | The Owner and Manager can generate Daily, Weekly, and Monthly sales reports and export them to PDF and Excel with figures matching the underlying transactions. |
| AC-6 | Roles | A user logged in under a given role can only access the screens and actions permitted to that role; this is verified for each role prior to sign-off. |
| AC-7 | Customer History | Searching a customer by phone number returns their correct order history, visit count, and total spend. |

# **11. MVP Scope vs. Future Features**

Keeping the MVP small is a deliberate choice, not a limitation: it lets the restaurant start solving its three biggest problems (Section 2) quickly, with lower cost and lower risk of scope changes mid-build.

## **11.1 In Scope — Phase 1 (MVP)**

- Authentication & role-based access (6 roles)

- Digital menu management (categories, combos, variations, add-ons)

- Visual table management

- Core order management with live status

- Kitchen display system

- Billing (Cash, Telebirr, CBE, Bank)

- Recipe-based automatic inventory deduction

- Employee accountability / activity logs

- Manager approval workflow (void, discount, price change)

- Owner, Manager, Cashier, Kitchen dashboards

- Core reports, exportable to PDF and Excel

- Simple customer history (phone-based, no loyalty program)

## **11.2 Out of Scope — Version 2**

*The following were intentionally excluded from the MVP. They may be proposed as a Phase 2 engagement once the MVP is in production and validated.*

- Supplier Management

- Procurement Workflow

- Attendance

- Payroll

- SMS Notifications

- Online Ordering

- Delivery Tracking

- Reservations

- Customer Loyalty Points

- Branch Management

- Offline Mode

- Cash Reconciliation

- Mixed payment methods (single-method payment only in MVP)

- Direct fiscal-machine integration

# **12. Approval and Sign-off**

By signing below, both parties agree that this document accurately reflects the scope of Phase 1 (MVP) of the Restaurant Management System. Any feature not described in this document is considered out of scope and will be handled as a separate change request.

**Client (Restaurant Owner / Manager):**

                                                                            

*Name / Signature / Date*

**Developer:**

                                                                            

*Name / Signature / Date*

Restaurant Management System — SRS v1.0    |    Page  of