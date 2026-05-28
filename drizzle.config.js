import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_82izfNChYtlB@ep-bitter-forest-aq68u7il-pooler.c-8.us-east-1.aws.neon.tech/ai-interview?sslmode=require&channel_binding=require'
  ,},
};
