import { createSecretKey } from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_SERVER,
  API_PREFIX,
  SECRET,
  REFRESH_STRING,
  SALT_OR_ROUNDS,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_DB,
} = process.env;

const DB = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  name: DB_NAME,
  dbServer: DB_SERVER
}

const api_prefix = API_PREFIX;

const AUTH = {
  secret: SECRET,
  refresh_string: REFRESH_STRING
}

const BCRYPT = {
  saltOrRounds: SALT_OR_ROUNDS
}

const REDIS = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  db: REDIS_DB
}

const config = {
  DB,
  api_prefix,
  AUTH,
  BCRYPT,
  REDIS
};

export default config;