import { getConnection } from "@/utils/database";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
  try {
    await getConnection();
    const post = await Post.findById(params.id).populate("creator");
    if (!post) {
      return new Response(
        JSON.stringify({
          message: "Post not found",
        }),
        {
          status: 404,
        }
      );
    }
    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to fetch post",
      }),
      {
        status: 500,
      }
    );
  }
};

export const PATCH = async (request, { params }) => {
  const { title, description, image, tag } = await request.json();
  try {
    await getConnection();
    const existingPost = await Post.findById(params.id).populate("creator");
    if (!existingPost) {
      return new Response(
        JSON.stringify({
          message: "Post not found",
        }),
        {
          status: 404,
        }
      );
    }
    existingPost.title = title;
    existingPost.description = description;
    existingPost.image = image;
    existingPost.tag = tag;

    await existingPost.save();
    return new Response(JSON.stringify(existingPost), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to update post",
      }),
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await getConnection();
    await Post.findByIdAndRemove(params.id);
    return new Response(
      JSON.stringify({
        message: "Post deleted successfully",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to deleted post",
      }),
      {
        status: 500,
      }
    );
  }
};
