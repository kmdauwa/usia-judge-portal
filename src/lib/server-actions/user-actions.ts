"use server"

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres'
import { users, userType } from '../supabase/schema'
import { eq, lt, gte, ne } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL as string

const client = postgres(connectionString)
const db = drizzle(client);


// Gets the user type from the database given the user
export async function getUserType(id: string) {
    const result = await db.select({
        userTypeName: userType.userTypeName,
    }).from(userType).where(eq(users.userid, id)).leftJoin(users, eq(users.userTypeId, userType.userTypeId))


    return result[0].userTypeName;
}