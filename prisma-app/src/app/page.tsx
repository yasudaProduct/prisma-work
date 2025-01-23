import prisma from "@/lib/prisma";

export default async function Home() {
  // SELECT "public"."Post"."id", "public"."Post"."title", "public"."Post"."content", "public"."Post"."published", "public"."Post"."userId" FROM "public"."Post" WHERE 1=1 OFFSET $1
  const posts = await prisma.post.findMany();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16">
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
