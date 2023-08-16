import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function createNewUser() {
  const user = await currentUser();

  const matchedUser = await db.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  if (!matchedUser) {
    await db.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  }

  revalidatePath("/journal");
  redirect("/journal");
}

export default async function NewUser() {
  await createNewUser();

  return <div>...loading</div>;
}
