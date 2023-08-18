import { buttonVariants } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  const { userId } = auth();

  let href = userId ? "/journal" : "/new-user";

  return (
    <div className="w-screen h-screen bg-white flex flex-col justify-center items-center text-black">
      <div className="max-w-2xl space-y-4 w-full mx-auto p-4">
        <h1 className="text-6xl">journal,</h1>
        <p className="text-2xl text-neutral-500">
          write some shit down and see how your mood trends
        </p>
        <div className="flex flex-row justify-start">
          <Link href={href} className={buttonVariants()}>
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
}
