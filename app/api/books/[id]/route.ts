
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "../../../../app/auth";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await context.params;

    if (!id) {
      return new NextResponse("Book ID is required", { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    if (!book || book.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("GET_BOOK_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await context.params;

    if (!id) {
      return new NextResponse("Book ID is required", { status: 400 });
    }

    const { title, author, genre } = await request.json();

    if (!title && !author && !genre) {
      return new NextResponse("No update data provided", { status: 400 });
    }

    // Verify that the book belongs to the authenticated user before updating
    const existingBook = await prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingBook || existingBook.userId !== session.user.id) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const updatedBook = await prisma.book.update({
      where: {
        id: id,
      },
      data: {
        title: title || existingBook.title,
        author: author || existingBook.author,
        genre: genre || existingBook.genre,
      },
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("PUT_BOOK_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await context.params;

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
