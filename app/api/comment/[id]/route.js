import { getConnection } from "@/utils/database";
import Comment from "@/models/Comment";

export const PATCH = async (req, { params }) => {
  const { comment } = await req.json();

  try {
    await getConnection();
    const existingComment = await Comment.findById(params.id);
    if (!existingComment) {
      return new Response(
        JSON.stringify({
          message: "Comment not found",
        }),
        { status: 404 }
      );
    }
    existingComment.comment = comment;
    await existingComment.save();
    return new Response(JSON.stringify(existingComment), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to update comment",
      }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await getConnection();
    await Comment.findByIdAndRemove(params.id);
    return new Response(
      JSON.stringify({
        message: "Comment deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to delete Comment",
      }),
      { status: 500 }
    );
  }
};
