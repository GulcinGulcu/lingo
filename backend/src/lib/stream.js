import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("Api key or api secret is missing.");
}

const steamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertSteamUser = async (userData) => {
  try {
    await steamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error in unserting user", error);
  }
};
