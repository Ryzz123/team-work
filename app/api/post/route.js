import { getConnection } from "@/utils/database";
import Post from "@/models/Post";
import Like from "@/models/Like";
import Share from "@/models/Share";
import Comment from "@/models/Comment";

export const GET = async (request) => {
  try {
    await getConnection();
    const posts = await Post.find({}).populate("creator");

    const postIds = posts.map((post) => post._id);

    const likes = await Like.find({ post: { $in: postIds } }).populate(
      "creator post"
    );
    const comments = await Comment.find({ post: { $in: postIds } }).populate(
      "creator post"
    );
    const shares = await Share.find({ post: { $in: postIds } }).populate(
      "creator post"
    );

    const mergedPosts = posts.map((post) => {
      const postLikes = likes.filter(
        (like) => like.post._id.toString() === post._id.toString()
      );
      const postComments = comments.filter(
        (comment) => comment.post._id.toString() === post._id.toString()
      );
      const postShares = shares.filter(
        (share) => share.post._id.toString() === post._id.toString()
      );

      return {
        ...post._doc,
        likes: postLikes,
        comments: postComments,
        shares: postShares
      };
    });

    return new Response(JSON.stringify(mergedPosts), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Gagal mengambil semua postingan",
      }),
      {
        status: 500,
      }
    );
  }
};
