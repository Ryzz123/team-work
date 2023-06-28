"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { storage } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { useData } from "@/context/PostContext";

const CreatePost = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { setStatus } = useData();
  const [error, setError] = useState({
    status: false,
    message: null,
    type: null,
  });
  const [input, setInput] = useState({
    title: null,
    description: null,
    image: null,
    tag: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role !== "admin" || !session?.user) {
      return router.push("/");
    }
  }, []);

  const inputOnchange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const validExtensions = ["image/png", "image/jpg", "image/jpeg"];
      if (validExtensions.includes(file.type)) {
        setInput((prevState) => ({ ...prevState, [e.target.name]: file }));
      } else {
        setInput({
          ...input,
          image: null,
        });
        e.target.value = "";
        setError({
          status: true,
          type: "info",
          message: "Gambar yang kamu masukan tidak valid!",
        });
        return;
      }
    } else {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      input.title === null ||
      input.description === null ||
      input.image === null ||
      input.tag === null
    ) {
      setLoading(false);
      setError({
        status: true,
        type: "info",
        message: "Input tidak boleh kosong",
      });
      return;
    }
    const date = new Date();
    const path = `/images/${session?.user?.id}${date.getTime()}`;
    const ref = storage.ref(path);
    await ref.put(input.image);
    const url = await ref.getDownloadURL();
    if (!input.image) {
      setLoading(false);
      setError({
        status: true,
        type: "info",
        message: "Masukan gambar postingan",
      });
      return;
    }
    try {
      const response = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: session?.user?.id,
          title: input.title,
          description: input.description,
          image: url,
          tag: input.tag,
        }),
      });
      setInput({
        title: null,
        description: null,
        image: null,
        tag: null,
      });
      if (response.ok) {
        setStatus('create');
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      setError({
        status: true,
        type: "warning",
        message: "Gagal post postingan",
      });
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={submitHandler}>
        <div className="flex flex-col w-[50%] m-auto my-10 gap-5">
          <div>{error.status && <h1>{error.message}</h1>}</div>
          <label>
            Title <br />
            <input
              type="text"
              name="title"
              value={input.title}
              onChange={inputOnchange}
            />
          </label>
          <label>
            Tag <br />
            <input
              type="text"
              name="tag"
              value={input.tag}
              onChange={inputOnchange}
            />
          </label>
          <label>
            Description <br />
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={inputOnchange}
            />
          </label>
          <input type="file" name="image" onChange={inputOnchange} />
        </div>
        <button
          className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          type="submit"
        >
          {loading ? "Loading" : "ADD"}
        </button>
      </form>
      {input.image && (
        <img width={530} src={URL.createObjectURL(input.image)} alt="Gambar" />
      )}
    </motion.div>
  );
};

export default CreatePost;
