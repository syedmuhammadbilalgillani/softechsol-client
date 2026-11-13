import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import logger from "@/utils/logger";
import { revalidateTag, revalidatePath } from "@/lib/revalidate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// CREATE Service
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, categoryId, image } = await req.json();
    const service = await prisma.service.create({
      data: {
        title,
        description,
        categoryId: Number(categoryId),
        ...(image && {
          image_id: image,
        }),
      },
    });
    await revalidateTag("categories-with-services");
    await revalidateTag("services-list");
    await revalidateTag("services");
    await revalidatePath("/services");
    await revalidatePath("/");
    return NextResponse.json(service);
  } catch (error) {
    logger.debug(error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}

// UPDATE Service
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, title, description, categoryId, image } = await req.json();

    const service = await prisma.service.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        categoryId: Number(categoryId),
        ...(image && {
          image_id: image,
        }),
      },
    });
    await revalidateTag("categories-with-services");
    await revalidateTag("services-list");
    await revalidateTag("services");
    await revalidatePath("/services");
    await revalidatePath("/");

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE Service
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();

    await prisma.service.delete({
      where: { id: Number(id) },
    });
    await revalidateTag("categories-with-services");
    await revalidateTag("services-list");
    await revalidateTag("services");
    await revalidatePath("/services");
    await revalidatePath("/");
    return NextResponse.json({ message: "Service deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
