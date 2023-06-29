"use client";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailPost = () => {
  const idParams = useSearchParams().get("id");
  const router = useRouter();
  const [post, setPost] = useState({});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div className="pt-32">post by id {idParams}</div>
    </motion.div>
  );
};

export default DetailPost;
