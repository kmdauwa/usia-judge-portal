'use server';

import { z } from 'zod';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { FormSchema } from '../types';
import { cookies } from 'next/headers';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres'
import {users, userType, judges} from '../supabase/schema'
import { eq, lt, gte, ne, sql } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL as string

const client = postgres(connectionString)
const db = drizzle(client);

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email);

  if (profileData?.length) return { error: { message: 'User already exists', profileData } };

  // Check if the email is part of the judges table
  const judgesResult = await db.select({
    email: judges.email
  }).from(judges).where(eq(judges.email, email))
  
  if (judgesResult.length == 0) return { error: { message: 'This email is not authorized to judge', data: judgesResult } };

  // Continue with the sign up process
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });
  return response;
}

export async function actionSignOutUser() {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signOut();
  return response;
}