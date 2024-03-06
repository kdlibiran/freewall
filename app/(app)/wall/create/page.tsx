import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function CreateWall() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return (
      <div className="flex h-[80vh] w-[50vh] flex-1 align-middle">
        <form
          className="text-foreground flex w-full flex-1 flex-col justify-center gap-2"
          action="/api/create/wall"
          method="post"
        >
          <label className="text-md" htmlFor="name">
            Wall Name
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="name"
            placeholder="wall name"
            required
          />
          <label className="text-md" htmlFor="desc">
            Wall Description
          </label>
          <textarea
            className="mb-6 h-[20vh] rounded-md border bg-inherit px-4 py-2"
            name="desc"
            placeholder="Write the description of your wall here."
          />
          <button className="text-foreground mb-2 rounded-md border px-4 py-2">
            Create Wall
          </button>
        </form>
      </div>
    );
  } else {
    return redirect("/");
  }
}
