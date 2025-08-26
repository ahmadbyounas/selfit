
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../app/auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    // Use plain object for where clause to avoid type error
    const whereClause: any = {
      userId: session.user.id,
    };

    if (query) {
      whereClause.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { author: { contains: query, mode: "insensitive" } },
      ];
    }

    const books = await prisma.book.findMany({
      where: whereClause,
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("GET_BOOKS_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, author, genre } = await request.json();

    if (!title || !author || !genre) {
      return new NextResponse("Missing title, author, or genre", { status: 400 });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        userId: session.user.id,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("POST_BOOK_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
