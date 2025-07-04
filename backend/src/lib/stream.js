import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error(
    "❌ STREAM_API_KEY or STREAM_API_SECRET is missing in environment variables."
  );
  process.exit(1); // Fail fast if critical config is missing
}

// Initialize Stream client
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

/**
 * Upserts a user into Stream Chat
 * @param {Object} userData - Object containing id, name, image, etc.
 */
export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("❌ Error upserting Stream user:", error.message);
    throw new Error("Failed to upsert user to Stream.");
  }
};

/**
 * Generates a Stream Chat JWT token for a user
 * @param {string} userId - ID of the user
 * @returns {string} JWT token
 */
export const generateStreamToken = (userId) => {
  try {
    if (!userId)
      throw new Error("User ID is required to generate a Stream token.");
    return streamClient.createToken(userId.toString());
  } catch (error) {
    console.error("❌ Error generating Stream token:", error.message);
    throw new Error("Failed to generate Stream token.");
  }
};
