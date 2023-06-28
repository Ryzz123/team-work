import { getConnection } from "@/utils/database";
import moment from "moment/moment";
import Share from "@/models/Share";

export const POST = async (req) => {
  const { userID, postID } = await req.json();
  try {
    await getConnection();
    const newShare = new Share({
      creator: userID,
      post: postID,
      created_at: moment().format("HH:mm DD MMMM YYYY"),
    });
    await newShare.save();
    return new Response(JSON.stringify(newLike), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to create new share",
      })
    );
  }
};
