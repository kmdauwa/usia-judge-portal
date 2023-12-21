import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Handles the GET request for the callback route.
 * 
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object that redirects the user to the dashboard.
 */
export async function GET(req: NextRequest) {
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.exchangeCodeForSession(code);
    }
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}