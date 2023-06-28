import { getConnection } from "@/utils/database";
import Post from "@/models/Post";
import Like from "@/models/Like";

export const GET = async (request, { params }) => {
  try {
    await getConnection();
    const posts = await Post.find({
      creator: params.id,
    }).populate("creator");
    const likes = await Like.find({
      creator: params.id,
    })
      .populate("creator")
      .populate("post");
    return new Response(
      JSON.stringify({
        posts,
        likes,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all posts", {
      status: 500,
    });
  }
};
