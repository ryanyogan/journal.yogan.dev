import { getUserByClerkId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type IParams = {
  params: {
    id: string;
  };
};

export async function PATCH(req: Request, { params }: IParams) {
  try {
    const user = await getUserByClerkId();
    const { content } = await req.json();
    if (!content) {
      return new NextResponse("Missing Content", { status: 400 });
    }

    const updatedEntry = await db.journalEntry.update({
      where: {
        userId: user.id,
        id: params.id,
      },
      data: {
        content,
      },
    });

    return NextResponse.json({ data: updatedEntry });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
