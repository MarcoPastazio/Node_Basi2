import http from "http";
import { Pool } from "pg";

//create one pool req
export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "music_store",
  password: "marcopastore",
  port: 5432,
});
