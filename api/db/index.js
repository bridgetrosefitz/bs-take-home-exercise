import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  database: "berry-street-takehome-1",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = async (text, params, callback) => {
  return pool.query(text, params, callback);
};
