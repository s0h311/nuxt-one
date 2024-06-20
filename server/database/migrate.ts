import 'dotenv/config'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db, connection } from './client'

await migrate(db, { migrationsFolder: 'server/database/migrations' })

await connection.end()
