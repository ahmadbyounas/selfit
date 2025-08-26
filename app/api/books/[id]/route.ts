
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../app/auth";

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    if (!id) {
      return new NextResponse("Book ID is required", { status: 400 });
    }

    // Verify that the book belongs to the authenticated user
    const book = await prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    if (!book || book.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.book.delete({
      where: {
        id: id,
      },
    });

    return new NextResponse("Book deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE_BOOK_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
