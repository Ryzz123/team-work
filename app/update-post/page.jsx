"use client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { storage } from "@/utils/firebase";

const UpdatePost = () => {
  const postId = useSearchParams().get("id");
  const name = useSearchParams().get("name");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: null,
    type: null,
  });
  const [link, setLink] = useState("");
  const [input, setInput] = useState({
    title: null,
    description: null,
    image: null,
    tag: null,
  });
  const router = useRouter();
  const getImageStorage = getStorage();

  useEffect(() => {
    if (
      session?.user?.role !== "admin" ||
      !session?.user ||
      name !== session?.user?.name
    )
      return router.push("/");
    const getPostDetail = async () => {
      const response = await fetch(`/api/post/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setInput({
        title: data.title,
        description: data.description,
        tag: data.tag,
      });
      setLink(data.image);
    };
    if (postId) getPostDetail();
  }, [postId]);

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

  const EditSubmitHandler = async (e) => {
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
    let url;
    const date = new Date();
    if (input.image) {
      const linkImage = link.split("/");
      const imageValue = decodeURIComponent(
        linkImage[linkImage.length - 1].split("?")[0]
      );
      const desertRef = ref(getImageStorage, imageValue);
      await deleteObject(desertRef);
      // tambah gambar baru
      const path = `images/${session?.user?.id}${date.getTime()}`;
      const refs = storage.ref(path);
      await refs.put(input.image);
      url = await refs.getDownloadURL();
    } else {
      url = link;
    }
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      setError({
        status: true,
        type: "warning",
        message: "Gagal update postingan",
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
      <form onSubmit={EditSubmitHandler}>
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
      {link && <img width={530} src={link} alt="Gambar" />}
    </motion.div>
  );
};

export default UpdatePost;
