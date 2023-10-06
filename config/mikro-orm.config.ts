import * as dotenv from 'dotenv';
dotenv.config();

export default {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT || 5432,
  dbName: process.env.DB_NAME,
  entities: ['./dist/src/**/entities/*'],
  entitiesTs: ['./src/**/entities/*'],
  migrations: {
    path: './dist/src/migrations',
    pathTs: './src/migrations',
  },
  type: 'postgresql',
};
