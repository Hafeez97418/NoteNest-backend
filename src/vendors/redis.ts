import { createClient } from "redis";
import * as dotenv from "dotenv";

dotenv.config();

let connection:any | undefined; // To store the Redis client instance

const getRedisClient = () => {
  if (!connection) {
    // Create the Redis client if it doesn't exist
    connection = createClient({
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: "redis-14268.c267.us-east-1-4.ec2.redns.redis-cloud.com",
        port: 14268,
      },
    });

    // Handle connection errors
    connection.on("error", (err:ErrorConstructor) => console.log("Redis Client Error:", err));
  }

  return connection;
};

// Connect once and reuse the client
  const client = getRedisClient();
(async () => {

  if (!client.isOpen) {
    try {
      console.log("Connecting to Redis...");
      await client.connect();
      console.log("Connected to Redis!");
    } catch (err) {
      console.error("Failed to connect to Redis:", err);
    }
  } else {
    console.log("Redis client is already connected.");
  }
})();

export default client;