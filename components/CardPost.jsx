"use client";
import { useData } from "@/context/PostContext";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function CardPost({ post }) {
  const [like, setLike] = useState(0);
  const { data: session } = useSession();
  const { getDataDetail, otherUser, sharePost } = useData();
  const [likeStatus, setLikeStatus] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setLike(post.likes.length);
    const status = post?.likes.filter(
      (like) => like.creator._id === session?.user?.id
    );
    if (status.length > 0) {
      setLikeStatus(true);
      setData(status[0]);
    } else {
      setLikeStatus(false);
    }
  }, [post]);

  const addLike = async () => {
    if (!session?.user) {
      alert("Silahkan Login Terlebih dahulu!");
      return;
    }
    setLike((prevLike) => prevLike + 1);
    setLikeStatus(true);
    await fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: session?.user?.id,
        postID: post._id,
      }),
    });
  };

  const deleteLike = async () => {
    if (!session?.user) {
      alert("Silahkan Login Terlebih dahulu!");
      return;
    }
    setLike((prevLike) => prevLike - 1);
    setLikeStatus(false);
    await fetch(`/api/like/${data._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="rounded-lg bg-[#171923] lg:bg-[#2D3748] shadow-lg overflow-hidden mb-10 sm:w-64 sm:mb-0 md:w-80 lg:w-72">
      <div className="flex items-center mt-2 mb-2 mx-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden border-2 border-gray-400 rounded-full">
            <img className="object-cover w-full h-full" src={post?.creator?.image} />
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <p className="text-white font-bold">{post?.creator?.username}</p>
              <img
                className="w-5 h-5 mx-1 mt-[3.5px]"
                src="images/verify-icon.svg"
              />
            </div>
            <p className="text-[#718096] text-sm">{post?.creator?.email}</p>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${post?.image})` }}
        className="w-full h-36 bg-cover"
      ></div>
      <div className="px-3 py-2 flex flex-row space-x-[9.5rem] lg:space-x-[6rem]">
        <div className="font-inter font-medium text-xs text-[#9D9EA0]">
          {post?.created_at.substring(0, 10)}
        </div>
        <button className="bg-[#22242457] font-bold px-2 rounded-full tracking-wide py-1.5 text-xs text-[#18F4B2] hover:scale-110 duration-300">
          #{post?.tag}
        </button>
      </div>
      <div className="px-6">
        <div className="font-inter font-bold text-xl mb-2 text-[#FFFFFF]">
          {post?.title}
        </div>
        <p className="font-inter text-base font-normal text-[#FFFFFF] mb-2">
          {post?.description}
        </p>
        <div className="py-4 flex">
          {likeStatus ? (
            <button onClick={deleteLike} className="mx-1 flex cursor-pointer">
              <img className="w-5" src="images/thumbs-hover.svg" />
              <h1 className=" mx-2 text-white">{like}</h1>
            </button>
          ) : (
            <button onClick={addLike} className="mx-1 flex cursor-pointer">
              <img className="w-5" src="images/thumbs-icon.svg" />
              <h1 className=" mx-2 text-white">{like}</h1>
            </button>
          )}
          <button className="mx-3 flex cursor-pointer">
            <img className="w-5" src="images/coment-icon.svg" />
            <h1 className=" mx-2 text-white">{post?.comments.length}</h1>
          </button>
          <button
            onClick={() => sharePost(post, session)}
            className="flex cursor-pointer"
          >
            <img className="w-5" src="images/share-icon.svg" />
            <h1 className=" mx-1 text-white">{post.shares.length}</h1>
          </button>
        </div>
      </div>
    </div>
  );
}
