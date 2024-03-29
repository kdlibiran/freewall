import PostDisplay from "@/components/PostDisplay";
import Replies from "@/components/Replies";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    if (error) {
      return <div>{error.message}</div>;
    }
    if (walls && walls.length === 0) {
      return (
        <div className="flex h-[80vh] flex-1 flex-row items-center">
          <div className="mt-4 flex w-[90vw] flex-1 flex-col items-center gap-2 sm:w-[50vw]">
            <p className="text-foreground text-center text-2xl font-thin">
              You are not following any walls.
            </p>
            <p className="text-foreground text-center text-xl font-thin">
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
      <div className="mt-4 flex w-[90vw] flex-1 flex-col gap-2 sm:w-[50vw]">
        {walls?.map((wall: Wall) =>
          wall.posts.map((post: Post) => (
            <div key={post.post_id}>
              <div className="text-foreground mb-2 rounded-md border px-4 py-2 text-xs">
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
          )),
        )}
      </div>
    );
  } else {
    return redirect("/");
  }
}
