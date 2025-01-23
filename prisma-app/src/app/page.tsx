import prisma from "@/lib/prisma";

export default async function Home() {
  // SELECT "public"."Post"."id", "public"."Post"."title", "public"."Post"."content", "public"."Post"."published", "public"."Post"."userId" FROM "public"."Post" WHERE 1=1 OFFSET $1
  const posts = await prisma.post.findMany();

  const userPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  const userPostsCondition = await prisma.post.findMany({
    include: {
      user: true,
    },
    where: {
      user: {
        name: {
          in: ["Bob"],
        },
      },
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-xl font-bold">Posts</h1>
      <p className="text-sm text-gray-500">
        const posts = await prisma.post.findMany();
        <br />
        {`
        SELECT "public"."Post"."id", "public"."Post"."title",
        "public"."Post"."content", "public"."Post"."published",
        "public"."Post"."userId" FROM "public"."Post" WHERE 1=1 OFFSET $1
        `}
      </p>

      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}

      <hr />

      <h2 className="text-xl font-bold">Users</h2>
      <p className="text-sm text-gray-500">
        const users = await prisma.user.findMany();
        <br />
        {`
        SELECT "public"."User"."id", "public"."User"."email", "public"."User"."name" FROM "public"."User" WHERE 1=1 OFFSET $1
        SELECT "public"."Post"."id", "public"."Post"."title", "public"."Post"."content", "public"."Post"."published", "public"."Post"."userId" FROM "public"."Post" WHERE "public"."Post"."userId" IN ($1,$2) OFFSET $3
        `}
      </p>

      {userPosts.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          {user.posts.map((post) => (
            <div key={post.id} className="ml-4">
              {post.title}
            </div>
          ))}
        </div>
      ))}

      <hr />

      <h2 className="text-xl font-bold">Condition</h2>
      <p className="text-sm text-gray-500">
        {`const userPostsCondition = await prisma.post.findMany({
            include: {
              user: true,
            },
            where: {
              user: {
                name: {
                  in: ["Bob"],
                },
              },
            },
          });
        }`}
      </p>

      <br />
      <p className="text-sm text-gray-500">
        {`
        SELECT "public"."Post"."id", "public"."Post"."title", "public"."Post"."content", "public"."Post"."published", "public"."Post"."userId" FROM "public"."Post" LEFT JOIN "public"."User" AS "j1" ON ("j1"."id") = ("public"."Post"."userId") WHERE ("j1"."name" IN ($1) AND ("j1"."id" IS NOT NULL)) OFFSET $2
        Params: ["Bob",0]
        SELECT "public"."User"."id", "public"."User"."email", "public"."User"."name" FROM "public"."User" WHERE "public"."User"."id" IN ($1) OFFSET $2
        Params: [2,0]
        `}
      </p>
      {userPostsCondition.map((post) => (
        <div key={post.id}>
          <h3>
            {post.user.name} {post.title}
          </h3>
        </div>
      ))}
    </div>
  );
}
