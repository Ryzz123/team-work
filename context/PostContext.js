"use client";
import { useRouter } from "next/navigation";
import { useEffect, createContext, useContext, useState } from "react";
import * as htmlToImage from "html-to-image";

const PostContext = createContext();

export const useData = () => {
  return useContext(PostContext);
};

export default function PostProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('get');

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const postRequest = await fetch("/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const usersRequest = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const postResponse = await postRequest.json();
      const usersResponse = await usersRequest.json();
      setPosts(postResponse);
      setUsers(usersResponse);
      setLoading(false);
    };
    fetchData();
  }, [status]);

  // function ke detail postingan
  const getDataDetail = (post) => {
    router.push(`/post?id=${post._id}`);
  };

  // function untuk lihat profil user punya postingan
  const otherUser = (creator, user) => {
    if (creator._id === user?.id) return router.push("/profile");
    router.push(`/profile/${creator._id}`);
  };

  // function cetak element to image
  const handleSaveImage = () => {
    const component = document.querySelector(".print-content");

    htmlToImage
      .toJpeg(component, { pixelRatio: 4 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `profile.jpeg`;
        link.click();
      })
      .catch((error) => {
        console.error("Gagal membuat gambar:", error);
      });
  };

  // function share
  const sharePost = async (post, session) => {
    const postUrl = `${window.location.origin}/post?id=${post._id}`;
    const shareData = {
      title: `Post ${post.title} created by ${post.creator.username}`,
      url: postUrl,
    };
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(async () => {
          await fetch("/api/share", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: session?.user?.id,
              postID: post._id,
            }),
          });
        })
        .catch((error) => {
          console.error("Terjadi kesalahan saat berbagi.", error);
        });
    } else {
      const el = document.createElement("textarea");
      el.value = postUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      alert("Tautan disalin ke papan klip!");
    }
  };

  const value = {
    posts,
    loading,
    getDataDetail,
    otherUser,
    users,
    handleSaveImage,
    sharePost,
    setStatus
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
