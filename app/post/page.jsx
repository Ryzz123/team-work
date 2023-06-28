"use client";
import { useData } from "@/context/PostContext";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailPost = () => {
  const idParams = useSearchParams().get("id");
  const router = useRouter();
  const { posts, loading } = useData();
  const [post, setPost] = useState({});

  useEffect(() => {
    if (!loading) {
      const post = posts.filter((post) => post._id === idParams);
      if (post.length > 0) {
        setPost(post);
      } else {
        router.push("/");
      }
    }
  }, [idParams, loading]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div>post by id {loading ? "await" : JSON.stringify(post)}</div>
    </motion.div>
  );
};

export default DetailPost;
