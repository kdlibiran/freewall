import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Reply from "./Reply";
import moment from "moment";

type Reply = {
  reply_id: string;
  wall_id: string;
  post_id: string;
  parent_reply_id: string;
  content: string;
  timestamp: string;
};

export default async function Replies({
  post_id,
  reply_id,
}: {
  post_id: string | null;
  reply_id: string | null;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("replies")
    .select("*,replies(*)")
    .or(
      `post_id.eq.${post_id ?? reply_id},parent_reply_id.eq.${
        reply_id ?? post_id
      }`
    )
    .order("timestamp", { ascending: false });
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {data?.map((reply: Reply) => (
        <div key={reply.reply_id} className="pl-8 mt-1">
          <span className="text-xs text-gray-400">
            By anonymous {moment(new Date(reply.timestamp)).fromNow()}
          </span>
          <p className="border rounded-md px-4 py-2 text-foreground mb-2 text-xs break-all">
            {reply.content}
          </p>
          <span className="text-xs text-gray-400">
            <Reply
              wall_id={reply.wall_id}
              parent_reply_id={reply.reply_id}
              post_id={null}
            />
          </span>
          <span className="text-xs text-gray-400">
            <Replies post_id={null} reply_id={reply.reply_id} />
          </span>
        </div>
      ))}
    </div>
  );
}
