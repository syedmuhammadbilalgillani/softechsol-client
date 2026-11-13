import prisma from "@/lib/prisma";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "@/lib/revalidate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const categoryId = parseInt(id);

  if (isNaN(categoryId)) {
    return NextResponse.json({ message: "Invalid category ID" }, { status: 400 });
  }

  try {
    const res = await prisma.blogCategory.delete({
      where: {
        category_id: categoryId,
      },
    });

    // Revalidate categories and blogs cache
    await revalidateTag("categories");
    await revalidateTag("blogs");
    await revalidatePath("/blogs");

    return NextResponse.json(
      { message: "Category deleted successfully", res },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Failed to delete category:", error);
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 }
    );
  }
}
