import { getConnection } from "@/utils/database";
import Like from "@/models/Like";

export const DELETE = async (req, { params }) => {
  try {
    await getConnection();
    await Like.findByIdAndRemove(params.id);
    return new Response(
      JSON.stringify({
        message: "Like deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to delete Like",
      }),
      { status: 500 }
    );
  }
};
