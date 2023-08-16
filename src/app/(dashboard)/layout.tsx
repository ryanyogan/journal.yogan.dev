import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-neutral w-screen h-screen relative">
      <aside className="absolute top-0 left-0 h-full border-r w-[100px] border-neutral-200">
        Journal
      </aside>
      <div className="ml-[100px] h-full overflow-hidden">
        <header className="relative w-full h-[60px] border-b border-neutral-200">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="bg-neutral-50 h-full overflow-scroll p-2 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
