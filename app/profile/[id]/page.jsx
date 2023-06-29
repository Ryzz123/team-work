"use client";
import { useData } from "@/context/PostContext";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const ProfileId = ({ params }) => {
  const [loadingID, setLoadingID] = useState(true);
  const [user, setUser] = useState({});
  const [postUser, setPostUser] = useState({
    posts: [],
    likes: [],
  });

  useEffect(() => {
    const getDataProfile = async () => {
      const request = await fetch(`/api/users/${params.id}/posts`, {
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
      setUser(usersid[0]);
      setLoadingID(false);
    };
    getDataProfile();
  }, [params]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div>{user?.username}</div>
      {loadingID ? (
        "await..."
      ) : (
        <>
          <p>Like {postUser.likes.length}</p>
          <p>Postingan {postUser.posts.length}</p>
        </>
      )}
    </motion.div>
  );
};

export default ProfileId;
