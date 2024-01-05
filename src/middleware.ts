import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res})
    const {
        data: { session }
    } = await supabase.auth.getSession()

    // Redirect to login if not logged in and trying to access protected routes
    if (req.nextUrl.pathname.startsWith("/home") ||
        req.nextUrl.pathname.startsWith("/art-gallery") ||
        req.nextUrl.pathname.startsWith("/films") ||
        req.nextUrl.pathname.startsWith("/performing-arts")) {
        if (!session) {
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }

    // Redirect to signup if email link is invalid or expired
    const emailLinkError = 'Email link is invalid or has expired';
    if (
        req.nextUrl.searchParams.get('error_description') === emailLinkError &&
        req.nextUrl.pathname !== '/signup'
    ) {
        return NextResponse.redirect(
            new URL(
            `/signup?error_description=${req.nextUrl.searchParams.get(
                'error_description'
            )}`,
            req.url
            )
        );
    }
  
    // Redirect to home if logged in and trying to access login or signup
    if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
        if (session) {
            return NextResponse.redirect(new URL('/home', req.url));
        }
    }
    return res;
  }