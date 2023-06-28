import { getConnection } from "@/utils/database";
import moment from "moment/moment";
import Comment from "@/models/Comment";

export const GET = async (request) => {
  try {
    await getConnection();
    const comments = await Comment.find({}).populate("creator").populate("post");
    return new Response(JSON.stringify(comments), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch all comments",
      }),
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req) => {
  const { userID, postID, comment } = await req.json();
  try {
    await getConnection();
    const newComment = new Comment({
      creator: userID,
      post: postID,
      comment,
      created_at: moment().format("HH:mm DD MMMM YYYY"),
    });
    await newComment.save();
    return new Response(JSON.stringify(newComment), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to create new comment",
      })
    );
  }
};
