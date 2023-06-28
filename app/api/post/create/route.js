import { getConnection } from "@/utils/database";
import Post from "@/models/Post";
import moment from "moment/moment";

export const POST = async (req) => {
  const { userID, title, description, image, tag } = await req.json();
  try {
    await getConnection();
    const newPost = new Post({
      creator: userID,
      title,
      description,
      image,
      tag,
      created_at: moment().format("HH:mm DD MMMM YYYY"),
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to create new prompt",
      })
    );
  }
};
