export type Role =
  | 'owner' | 'manager' | 'cashier' | 'waiter' | 'kitchen' | 'accountant'

export type Module =
  | 'authentication' | 'menu' | 'tables' | 'orders' | 'kitchen' | 'billing'
  | 'inventory' | 'activity_logs' | 'approvals' | 'reports' | 'customers'

export type Access = 'full' | 'view' | 'approve' | 'request' | 'none'

// Module access matrix from SRS section 3.2
const matrix: Record<Module, Record<Role, Access>> = {
  authentication: { owner: 'full', manager: 'full', cashier: 'full', waiter: 'full', kitchen: 'full', accountant: 'full' },
  menu:           { owner: 'full', manager: 'full', cashier: 'view', waiter: 'view', kitchen: 'none', accountant: 'none' },
  tables:         { owner: 'full', manager: 'full', cashier: 'view', waiter: 'full', kitchen: 'none', accountant: 'none' },
  orders:         { owner: 'view', manager: 'view', cashier: 'view', waiter: 'full', kitchen: 'view', accountant: 'none' },
  kitchen:        { owner: 'view', manager: 'view', cashier: 'view', waiter: 'none', kitchen: 'full', accountant: 'none' },
  billing:        { owner: 'view', manager: 'view', cashier: 'full', waiter: 'none', kitchen: 'none', accountant: 'none' },
  inventory:      { owner: 'full', manager: 'full', cashier: 'none', waiter: 'none', kitchen: 'none', accountant: 'none' },
  activity_logs:  { owner: 'full', manager: 'view', cashier: 'none', waiter: 'none', kitchen: 'none', accountant: 'none' },
  approvals:      { owner: 'full', manager: 'approve', cashier: 'request', waiter: 'request', kitchen: 'none', accountant: 'none' },
  reports:        { owner: 'full', manager: 'full', cashier: 'view', waiter: 'none', kitchen: 'view', accountant: 'view' },
  customers:      { owner: 'full', manager: 'full', cashier: 'full', waiter: 'none', kitchen: 'none', accountant: 'none' },
}

export function getAccess(role: Role, module: Module): Access {
  return matrix[module]?.[role] ?? 'none'
}

// 'view' = any access at all; 'edit' = Full access only
export function hasPermission(
  role: Role,
  module: Module,
  action: 'view' | 'edit' = 'view'
): boolean {
  const access = getAccess(role, module)
  if (action === 'view') return access !== 'none'
  return access === 'full'
}
