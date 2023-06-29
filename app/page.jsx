import Hero from "@/components/Hero";
import PostHero from "@/components/PostHero";

async function getData() {
  const res = await fetch("http://localhost:3000/api/post", {
    cache: "no-cache",
  });
  return res.json();
}

export default async function Home() {
  const posts = await getData();

  return (
    <>
      <Hero />
      <PostHero posts={posts} />
    </>
  );
}
