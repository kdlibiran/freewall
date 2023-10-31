import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import WallDisplay from "@/components/WallDisplay";
import Reply from "@/components/Reply";
import Replies from "@/components/Replies";
import moment from "moment";
type Wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
  follows: any[];
};
type Post = {
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
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="mt-4 sm:w-[50vw] w-[90vw]">
      <WallDisplay wall={data[0]} />
      <Separator className="mb-3 mt-3" />
      <ScrollArea className="sm:h-[57vh] h-[35vh]">
        {data[0].posts.map((post: Post) => (
          <div key={post.post_id}>
            <span className="text-xs text-gray-400">
              By anonymous on {moment(new Date(post.timestamp)).fromNow()}
            </span>
            <p className="border rounded-md px-4 py-2 text-foreground mb-2 text-xs break-all">
              {post.content}
            </p>
            <span className="text-xs text-gray-400">
              <Reply
                wall_id={params.wall_id}
                post_id={post.post_id}
                parent_reply_id={null}
              />
            </span>
            <Replies post_id={post.post_id} reply_id={null} />
            <p></p>
          </div>
        ))}
      </ScrollArea>
      <Separator className="mb-3" />
      <form action="/api/create/post" method="post">
        <div className="flex flex-row gap-2 mb-2 align-middle">
          <input type="hidden" name="wall_id" value={params.wall_id} />
          <textarea
            className="rounded-md px-4 py-2 bg-inherit border mb-6 h-[15vh] w-full text-xs"
            name="content"
            placeholder="Write a post here."
          />
          <button className="border rounded-md px-4 py-2 text-foreground mb-2 h-[15vh]">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
