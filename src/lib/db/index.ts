import "server-only"
import * as categoriesSchema from "./schemas/categories-schema"
import * as companiesSchema from "./schemas/companies-schema"
export * from "./schemas/categories-schema"
export * from "./schemas/companies-schema"
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const schema = {
  ...categoriesSchema,
  ...companiesSchema,
}

const connectionString = process.env.POSTGRES_URL

if (!connectionString) {
  throw new Error("POSTGRES_URL is not set")
}

const createDrizzleClient = () => {
  const conn = postgres(connectionString)
  return drizzle(conn, { casing: 'snake_case', schema })
}
const globalForDrizzle = globalThis as unknown as {
  db: ReturnType<typeof createDrizzleClient> | undefined
}
export const db = globalForDrizzle.db ?? createDrizzleClient()
if (process.env.NODE_ENV !== 'production') globalForDrizzle.db = db