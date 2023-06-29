import Hero from "@/components/Hero";
import PostHero from "@/components/PostHero";

async function getData() {
  const res = await fetch("https://rfertech.vercel.app/api/post", {
    cache: "no-store",
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
