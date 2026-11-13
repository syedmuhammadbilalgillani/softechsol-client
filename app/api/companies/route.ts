import prisma from "@/lib/prisma";
import logger from "@/utils/logger";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidateTag, revalidatePath } from "@/lib/revalidate";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { featured_image_id } = await request.json();
    logger.debug(featured_image_id, "featured_image_id");
    const company = await prisma.myCompanies.create({
      data: {
        featured_image: { connect: { id: featured_image_id as string } },
      },
    });

    await revalidateTag("companies");
    await revalidatePath("/");

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    logger.error(error, "Error creating company");
    return NextResponse.json(
      { error: "Failed to create company" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { company_id } = await request.json();
    logger.debug(company_id, "company_id");
    const company = await prisma.myCompanies.delete({
      where: { company_id: Number(company_id) },
    });

    await revalidateTag("companies");
    await revalidatePath("/");

    return NextResponse.json(company);
  } catch (error) {
    logger.error(error, "Error deleting company");
    return NextResponse.json(
      { error: "Failed to delete company" },
      { status: 500 }
    );
  }
}

