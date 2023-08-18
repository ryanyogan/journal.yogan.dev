import { analayze } from "@/lib/ai";
import { getUserByClerkId } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
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

    const analysis = await analayze(updatedEntry.content);

    // const savedAnalysis = await db.analysis.upsert({
    //   where: {
    //     entryId: updatedEntry.id,
    //   },
    //   update: { ...analysis },
    //   create: {
    //     entryId: updatedEntry.id,
    //     ...analysis,
    //   },
    // });

    const savedAnalysis = await db.analysis.update({
      where: {
        entryId: updatedEntry.id,
      },
      data: {
        ...analysis,
      },
    });

    // update(["/journal"]);
    revalidatePath("/journal");

    return NextResponse.json({
      data: { ...updatedEntry, analysis: savedAnalysis },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
