import { createClient } from "redis";
import * as dotenv from "dotenv";

dotenv.config();

// Create a Redis client
const client = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-14268.c267.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 14268,
  },
});

// Handle connection errors
client.on("error", (err) => console.log("Redis Client Error:", err));

// Connect once and reuse the client
(async () => {
  try {
    await client.connect();
    console.log("Connected to Redis!");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
})();

export default client;

