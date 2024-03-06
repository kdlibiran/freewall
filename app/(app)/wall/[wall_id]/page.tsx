import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import WallDisplay from "@/components/WallDisplay";
import Actions from "@/components/Actions";
import Replies from "@/components/Replies";
import moment from "moment";
import { redirect } from "next/navigation";
type Wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
  follows: any[];
};
type Post = {
  user_id: string;
  post_id: string;
  wall_id: string;
  content: string;
  timestamp: string;
};
export default async function Wall({
  params,
}: {
  params: { wall_id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("walls")
    .select("*,posts(*),follows(*)")
    .eq("wall_id", params.wall_id)
    .order("timestamp", { foreignTable: "posts", ascending: false });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    if (error) {
      return <div>{error.message}</div>;
    }
    return (
      <div className="mt-4 w-[90vw] sm:w-[50vw]">
        <WallDisplay wall={data[0]} />
        <Separator className="mb-3 mt-3" />
        <ScrollArea className="h-[35vh] sm:h-[57vh]">
          {data[0].posts.map((post: Post) => (
            <div key={post.post_id}>
              <span className="text-xs text-gray-400">
                By anonymous on {moment(new Date(post.timestamp)).fromNow()}
              </span>
              <p className="text-foreground mb-2 break-all rounded-md border px-4 py-2 text-xs">
                {post.content}
              </p>
              <Actions
                wall_id={params.wall_id}
                post_id={post.post_id}
                parent_reply_id={null}
                user_id={post.user_id}
              />
              <Replies post_id={post.post_id} reply_id={null} />
            </div>
          ))}
        </ScrollArea>
        <Separator className="mb-3" />
        <form action="/api/create/post" method="post">
          <div className="mb-2 flex flex-row gap-2 align-middle">
            <input type="hidden" name="wall_id" value={params.wall_id} />
            <textarea
              className="mb-6 h-[15vh] w-full rounded-md border bg-inherit px-4 py-2 text-xs"
              name="content"
              placeholder="Write a post here."
            />
            <button className="text-foreground mb-2 h-[15vh] rounded-md border px-4 py-2">
              Post
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return redirect("/");
  }
}
