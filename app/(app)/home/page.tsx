import PostDisplay from "@/components/PostDisplay";
import Replies from "@/components/Replies";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import Actions from "@/components/Actions";
type Post = {
  user_id: string;
  post_id: string;
  wall_id: string;
  content: string;
  timestamp: string;
  wall: Wall;
};

type Wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
  posts: Post[];
  follows: any[];
};

type follows = {
  wall_id: string;
  user_id: string;
};

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("follows")
    .select("walls(*,posts(*),follows(*))")
    .order("timestamp", { foreignTable: "walls.posts", ascending: false });
  const walls = data?.map((follow: any) => follow.walls);

  if (error) {
    return <div>{error.message}</div>;
  }
  if (walls && walls.length === 0) {
    return (
      <div className="flex flex-1 flex-row items-center h-[80vh]">
        <div className="mt-4 sm:w-[50vw] w-[90vw] gap-2 flex flex-1 flex-col items-center">
          <p className="text-foreground text-2xl font-thin text-center">
            You are not following any walls.
          </p>
          <p className="text-foreground text-xl font-thin text-center">
            <Link href="/search" className="font-extrabold">
              Click here
            </Link>{" "}
            to find walls to follow.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="gap-2 flex flex-1 flex-col mt-4 sm:w-[50vw] w-[90vw]">
      {walls?.map((wall: Wall) =>
        wall.posts.map((post: Post) => (
          <div key={post.post_id}>
            <div className="border rounded-md px-4 py-2 text-foreground mb-2 text-xs">
              <PostDisplay post={post} wall={wall} />
            </div>
            <span className="text-xs text-gray-400">
              <Actions
                wall_id={wall.wall_id}
                post_id={post.post_id}
                parent_reply_id={null}
                user_id={post.user_id}
              />
            </span>
          </div>
        ))
      )}
    </div>
  );
}
