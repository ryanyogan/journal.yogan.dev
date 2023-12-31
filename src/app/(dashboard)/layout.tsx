import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral w-screen h-screen relative">
      <header className="sticky w-full h-[60px] z-10 bg-white border-b border-neutral-200">
        <div className="h-full w-full px-6 flex items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-x-4">
            <Link href="/journal">
              <h1 className="text-black text-xl font-bold tracking-tighter">
                J O U R N A L
              </h1>
            </Link>
            <Link href="/history" className="ml-4">
              <h1 className="text-neutral-700 text-sm font-bold tracking-tighter">
                H I S T O R Y
              </h1>
            </Link>
          </div>
          <UserButton />
        </div>
      </header>
      <div className="bg-neutral-50 overflow-scroll p-8">{children}</div>
    </div>
  );
}
