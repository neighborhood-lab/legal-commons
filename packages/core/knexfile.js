import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Load environment variables
config({ path: path.resolve(__dirname, '../../.env.local') })
const knexConfig = {
  client: 'pg',
  connection:
    process.env['NODE_ENV'] === 'production'
      ? process.env['DATABASE_URL']
      : process.env['POSTGRES_URL_NON_POOLING'] || process.env['DATABASE_URL'],
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 60000,
    idleTimeoutMillis: 600000,
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
    tableName: 'knex_migrations',
    extension: 'ts',
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds'),
    extension: 'ts',
  },
  debug: process.env['NODE_ENV'] === 'development',
}
export default knexConfig
//# sourceMappingURL=knexfile.js.map
