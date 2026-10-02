import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { hasPermission, type Module, type Role } from './lib/permissions'

const pathToModule: Record<string, Module> = {
  '/login': 'authentication',
  '/owner': 'reports',
  '/manager': 'reports',
  '/cashier': 'billing',
  '/waiter': 'orders',
  '/kitchen': 'kitchen',
  '/accountant': 'reports',
  '/menu': 'menu',
  '/tables': 'tables',
  '/ingredients': 'inventory',
}

const dashboardMap: Record<string, string> = {
  owner: '/owner',
  manager: '/manager',
  cashier: '/cashier',
  waiter: '/waiter',
  kitchen: '/kitchen',
  accountant: '/accountant',
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Redirect while keeping any refreshed login cookies
  const redirectTo = (path: string) => {
    const redirect = NextResponse.redirect(new URL(path, request.url))
    response.cookies.getAll().forEach((c) => redirect.cookies.set(c))
    return redirect
  }

  const { data: { user } } = await supabase.auth.getUser()

  // Not logged in: only /login is allowed
  if (!user) {
    if (pathname === '/login') return response
    return redirectTo('/login')
  }

  // Logged in: find the role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role_id')
    .eq('id', user.id)
    .single()

  const { data: role } = profile
    ? await supabase.from('roles').select('name').eq('id', profile.role_id).single()
    : { data: null }

  // Logged in but no profile/role: let them see /login, block everything else
  if (!role) {
    if (pathname === '/login') return response
    return redirectTo('/login')
  }

  const userRole = role.name.toLowerCase() as Role
  const myDashboard = dashboardMap[userRole] || '/login'

  // Already logged in: skip the login page and the home page
  if (pathname === '/login' || pathname === '/') {
    return redirectTo(myDashboard)
  }

  // Match the path (and sub-paths) to a module
  const matchedKey = Object.keys(pathToModule).find(
    (key) => pathname === key || pathname.startsWith(key + '/')
  )
  const module: Module = matchedKey ? pathToModule[matchedKey] : 'authentication'

  if (!hasPermission(userRole, module, 'view')) {
    return redirectTo(myDashboard)
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
