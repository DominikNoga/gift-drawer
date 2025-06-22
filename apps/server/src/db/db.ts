import knex from 'knex';
import config from './knex';

export const db = knex(config);
