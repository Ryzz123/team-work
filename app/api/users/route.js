import { getConnection } from "@/utils/database";
import User from "@/models/User";

export const GET = async (req) => {
  try {
    await getConnection();
    const users = await User.find({});
    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch all users",
      }),
      {
        status: 500,
      }
    );
  }
};
