import PostDisplay from "@/components/PostDisplay";
import Replies from "@/components/Replies";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import Actions from "@/components/Actions";
type Post = {
  post_id: string;
  wall_id: string;
  content: string;
  timestamp: string;
  walls: Wall;
};

type Wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
  posts: Post[];
  follows: any[];
};

type saves = {
  post_id: string;
  user_id: string;
  posts: Post[];
};

export default async function Saved() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("saves")
    .select("posts(*,walls(*))")
    .order("timestamp", { foreignTable: "posts", ascending: false });
  const posts = data?.flatMap((save: { posts: Post[] }) => save.posts);
  if (error) {
    return <div>{error.message}</div>;
  }
  if (data && data.length === 0) {
    return (
      <div className="flex flex-1 flex-row items-center h-[80vh]">
        <div className="mt-4 sm:w-[50vw] w-[90vw] gap-2 flex flex-1 flex-col items-center">
          <p className="text-foreground text-2xl font-thin text-center">
            You have not saved any posts.
          </p>
          <p className="text-foreground text-xl font-thin text-center">
            <Link href="/search" className="font-extrabold">
              Click here
            </Link>{" "}
            to find posts.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="gap-2 flex flex-1 flex-col mt-4 sm:w-[50vw] w-[90vw]">
      {posts?.map((post: Post) => (
        <div key={post.post_id}>
          <div className="border rounded-md px-4 py-2 text-foreground mb-2 text-xs">
            <PostDisplay post={post} wall={post.walls} />
          </div>
          <span className="text-xs text-gray-400">
            <Actions
              wall_id={post.wall_id}
              post_id={post.post_id}
              parent_reply_id={null}
            />
          </span>
        </div>
      ))}
    </div>
  );
}
