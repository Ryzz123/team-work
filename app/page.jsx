"use client";
import Hero from "@/components/Hero";
import PostHero from "@/components/PostHero";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const postRequest = await fetch("/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      const postResponse = await postRequest.json();
      setPosts(postResponse);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <PostHero posts={posts} loading={loading} />
    </motion.div>
  );
}
