import { generateStreamToken } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = await generateStreamToken(req.user._id);

    return res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getting stream token controller", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};
