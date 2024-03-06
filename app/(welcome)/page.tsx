import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import TypeWriter from "@/components/TypeWriter";
import { redirect } from "next/navigation";

export default async function Index() {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return (
      <div className="flex w-full flex-1 flex-col items-center">
        <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
          <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
            <div className="font-mono text-lg">FreeWall</div>
            <AuthButton />
          </div>
        </nav>

        <div className="text-foreground flex w-full flex-1 flex-col justify-center gap-2">
          <h1 className="text-center font-mono text-[4rem] font-bold">Write</h1>
          <h1 className="text-center font-mono text-[4rem] font-bold">
            <TypeWriter />
          </h1>
        </div>
      </div>
    );
  } else {
    return redirect("/home");
  }
}
