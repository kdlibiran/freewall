import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

type Wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
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
    .select("*")
    .eq("wall_id", params.wall_id)
    .single();

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <h1>{data.wall_name}</h1>
      <p>{data.wall_desc}</p>
    </div>
  );
}
