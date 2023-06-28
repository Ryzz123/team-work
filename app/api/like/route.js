import { getConnection } from "@/utils/database";
import moment from "moment/moment";
import Like from "@/models/Like";

export const GET = async (req) => {
  try {
    await getConnection();
    const likes = await Like.find({}).populate("creator").populate("post");
    return new Response(JSON.stringify(likes), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch all likes",
      }),
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req) => {
  const { userID, postID } = await req.json();
  try {
    await getConnection();
    const newLike = new Like({
      creator: userID,
      post: postID,
      created_at: moment().format("HH:mm DD MMMM YYYY"),
    });
    await newLike.save();
    return new Response(JSON.stringify(newLike), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to create new like",
      })
    );
  }
};
