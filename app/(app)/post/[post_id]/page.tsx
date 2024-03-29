import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import PostDisplay from "@/components/PostDisplay";
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

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    if (error) {
      return <div>{error.message}</div>;
    }
    return (
      <div className="mt-4 w-[90vw] sm:w-[50vw]">
        <div className="text-foreground mb-2 rounded-md border px-4 py-2 text-xs">
          <PostDisplay post={data[0]} wall={data[0].walls} />
        </div>
        <span className="text-xs text-gray-400">
          <Actions
            wall_id={data[0].wall_id}
            post_id={data[0].post_id}
            parent_reply_id={null}
            user_id={data[0].user_id}
          />
        </span>
        <Replies post_id={data[0].post_id} reply_id={null} />
      </div>
    );
  } else {
    return redirect("/");
  }
}
