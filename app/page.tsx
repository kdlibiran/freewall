import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import TypeWriter from "@/components/TypeWriter";
export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div className="font-mono text-lg">FreeWall</div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="w-screen  flex-col items-center justify-center align-middle">
        <h1 className="text-[4rem] font-bold text-center mt-[13rem] font-mono">
          Write
        </h1>
        <h1 className="text-[4rem] font-bold text-center font-mono">
          <TypeWriter />
        </h1>
      </div>
    </div>
  );
}
