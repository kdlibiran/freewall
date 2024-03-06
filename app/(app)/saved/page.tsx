import PostDisplay from "@/components/PostDisplay";
import Replies from "@/components/Replies";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import Actions from "@/components/Actions";
import { redirect } from "next/navigation";
type Post = {
  user_id: string;
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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    if (error) {
      return <div>{error.message}</div>;
    }
    if (data && data.length === 0) {
      return (
        <div className="flex h-[80vh] flex-1 flex-row items-center">
          <div className="mt-4 flex w-[90vw] flex-1 flex-col items-center gap-2 sm:w-[50vw]">
            <p className="text-foreground text-center text-2xl font-thin">
              You have not saved any posts.
            </p>
            <p className="text-foreground text-center text-xl font-thin">
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
      <div className="mt-4 flex w-[90vw] flex-1 flex-col gap-2 sm:w-[50vw]">
        {posts?.map((post: Post) => (
          <div key={post.post_id}>
            <div className="text-foreground mb-2 rounded-md border px-4 py-2 text-xs">
              <PostDisplay post={post} wall={post.walls} />
            </div>
            <span className="text-xs text-gray-400">
              <Actions
                wall_id={post.wall_id}
                post_id={post.post_id}
                parent_reply_id={null}
                user_id={post.user_id}
              />
            </span>
          </div>
        ))}
      </div>
    );
  } else {
    redirect("/");
  }
}
