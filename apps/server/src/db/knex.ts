import type { Knex } from 'knex';
import path from 'path';

const isProd = !!process.env.POSTGRES_URL;

const config: Knex.Config = isProd
  ? {
      client: 'pg',
      connection: process.env.POSTGRES_URL,
      migrations: {
        directory: path.resolve(__dirname, 'migrations'),
        tableName: 'knex_migrations',
        extension: 'ts'
      }
    }
  : {
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, 'gd.db.sqlite3')
      },
      useNullAsDefault: true,
      migrations: {
        directory: path.resolve(__dirname, 'migrations'),
        tableName: 'knex_migrations',
        extension: 'ts'
      }
    };

export default config;
module.exports = config;
