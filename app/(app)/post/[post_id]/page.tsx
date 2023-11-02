import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import PostDisplay from "@/components/PostDisplay";
import Actions from "@/components/Actions";
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
export default async function Post({
  params,
}: {
  params: { post_id: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("posts")
    .select("*,replies(*),walls(*)")
    .eq("post_id", params.post_id)
    .order("timestamp", { ascending: false });
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="mt-4 sm:w-[50vw] w-[90vw]">
      <div className="border rounded-md px-4 py-2 text-foreground mb-2 text-xs">
        <PostDisplay post={data[0]} wall={data[0].walls} />
      </div>
      <span className="text-xs text-gray-400">
        <Actions
          wall_id={data[0].wall_id}
          post_id={data[0].post_id}
          parent_reply_id={null}
        />
      </span>
      <Replies post_id={data[0].post_id} reply_id={null} />
    </div>
  );
}
