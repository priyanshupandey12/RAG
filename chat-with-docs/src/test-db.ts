
import { pool } from "./db.js";

async function testConnection() {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time"
    );

    console.log("Database connected!");
    console.log("PostgreSQL time:", result.rows[0].current_time);
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    await pool.end();
  }
}

testConnection();
