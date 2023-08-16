import { auth } from "@clerk/nextjs";
import { User } from "@prisma/client/edge";
import { db } from "./db";

export async function getUserByClerkId(): Promise<User> {
  const { userId } = auth();

  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: userId as string,
      },
    });

    if (!user) {
      throw new Error("User Required");
    }

    return user;
  } catch (error: any) {
    return error;
  }
}
