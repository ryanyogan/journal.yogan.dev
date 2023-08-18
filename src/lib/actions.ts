"use server";

import { revalidatePath } from "next/cache";

export const update = (paths: any[] = []) =>
  paths.forEach((p) => revalidatePath(p));
