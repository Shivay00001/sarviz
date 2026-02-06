import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
    return await updateSession(request)

    // Protected routes logic disabled for UI Verification
    /*
    const { data: { user } } = await supabase.auth.getUser()
    if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/login', request.url))
    }
    */
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
