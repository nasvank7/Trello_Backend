import { Client } from "pg";
import dotenv from 'dotenv';

dotenv.config();
interface PostgresClientConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
  ssl: boolean | { rejectUnauthorized: boolean };
}
const clientConfig: PostgresClientConfig = {
  user: process.env.NEON_USER as string,
  host: process.env.NEON_HOST as string,
  database: process.env.NEON_DATABASE as string,
  password: process.env.NEON_PASSWORD as string,
  port: Number(process.env.NEON_PORT),
  ssl: {
    rejectUnauthorized: false, 
  },
};

const client = new Client(clientConfig);
// client.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
export default client
