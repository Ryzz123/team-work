import { getConnection } from "@/utils/database";
import User from "@/models/User";

export const PATCH = async (req, { params }) => {
  const { username, bio, website, profesi, instagram, github } = await req.json();
  try {
    await getConnection();
    const existingUser = await User.findById(params.id);
    if (!existingUser) {
      return new Response(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 404 }
      );
    }
    existingUser.username = username;
    existingUser.bio = bio;
    existingUser.website = website;
    existingUser.instagram = instagram;
    existingUser.github = github;
    existingUser.profesi = profesi;
    await existingUser.save();
    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to update user",
      }),
      { status: 500 }
    );
  }
};
