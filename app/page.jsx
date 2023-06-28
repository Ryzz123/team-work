"use client";
import { Hero } from "@/components/Hero";
import PostHero from "@/components/PostHero";
import { motion } from "framer-motion";

export default function Home() {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <PostHero />
    </motion.div>
  );
}
