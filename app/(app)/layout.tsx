import Topbar from "@/components/Topbar";
import ".././globals.css";

export const metadata = {
  title: "FreeWall",
  description: "A free and open source social media platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="h-screen flex flex-col items-center">
          <Topbar />
          {children}
        </main>
      </body>
    </html>
  );
}
