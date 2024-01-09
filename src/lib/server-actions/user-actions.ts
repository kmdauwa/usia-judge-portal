"use server"

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres'
import {users, userType} from '../supabase/schema'
import { eq, lt, gte, ne, sql } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL as string

const client = postgres(connectionString)
const db = drizzle(client);


// Gets the user type from the database given the user
/*
SELECT "UserType".usertype_name 
FROM "UserType" 
JOIN "Users" ON "UserType".usertype_id="Users".usertypeid 
WHERE "Users".userid = 'your_user_id'
*/
export async function getUserType(id: string) {
    const result = await db.select({
        userTypeName: userType.usertypeName
    }).from(userType).where(eq(users.userid, id)).leftJoin(users, eq(users.usertypeid, userType.usertypeId))


    return result[0].userTypeName;
}