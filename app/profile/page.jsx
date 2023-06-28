"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [postUser, setPostUser] = useState({
    posts: [],
    likes: [],
  });
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) return router.push("/");
    const getDataProfile = async () => {
      const request = await fetch(`/api/users/${session?.user?.id}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      setPostUser({
        posts: response.posts,
        likes: response.likes,
      });
      setLoading(false);
    };
    getDataProfile();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post.id}&name=${session?.user?.name}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div className="pt-14" onClick={() => handleEdit({ id: "649ad2d6dac03e9a76d3e720" })}>
        Profile {session?.user?.name}
        {loading ? (
          "loading"
        ) : (
          <>
            <p>Like {postUser.likes.length}</p>
            <p>Postingan {postUser.posts.length}</p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
