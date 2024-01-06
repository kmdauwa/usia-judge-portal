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
        userType: users.userTypeId,
    }).from(users).where(eq(users.userid, id))

    const type = result[0].userType;

    // all in one
    const data = await db.query.findOne({
        attributes: ['userid'],
        where: {
            userid: id
        },
        include: [
            {
                model: userType,
                attributes: ['userType']
            }
        ]
    })

    return result[0].userType;
}