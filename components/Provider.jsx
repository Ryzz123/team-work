"use client";

import PostProvider from "@/context/PostContext";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <AnimatePresence>
        <PostProvider>{children}</PostProvider>
      </AnimatePresence>
    </SessionProvider>
  );
};

export default Provider;
