import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Topbar() {
  return (
    <nav className="w-full fixed top-0 z-50 flex justify-center border-b border-b-foreground/10 h-16 bg-background">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <Link href="/dashboard" className="font-mono text-lg">
          FreeWall
        </Link>
        <AuthButton />
      </div>
    </nav>
  );
}
