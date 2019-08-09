/**
 * @author     David Havl info@davidhavl.com
 * @license    MIT
 */
export default {
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  cache: {
  },
}
