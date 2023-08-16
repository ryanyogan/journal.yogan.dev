import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral w-screen h-screen relative">
      {/* <aside className="absolute top-0 left-0 h-full border-r w-[100px] border-neutral-200">
        Journal
      </aside> */}
      <div className="h-full overflow-hidden">
        <header className="relative w-full h-[60px] border-b border-neutral-200">
          <div className="h-full w-full px-6 flex items-center justify-between">
            <Link href="/journal">
              <h1 className="text-black text-xl font-bold tracking-tighter">
                J O U R N A L
              </h1>
            </Link>
            <UserButton />
          </div>
        </header>
        <div className="bg-neutral-50 h-full overflow-scroll p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
