import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export async function POST(req: Request) {
  const session = auth.api.getSession({headers: await headers()})
  const { movie_id, user_id } = await req.json();
  if (!movie_id || !user_id || !session) {
    return NextResponse.json({ error: "movie_id and user_id required" }, { status: 400 });
  }

  try {
    const favorite = await prisma.favorite.create({
      data: { movie_id, user_id }, 
    });
    return NextResponse.json(favorite, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Cannot create favorite" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const user_id = url.searchParams.get("user_id"); 
  if (!user_id) {
    return NextResponse.json({ error: "user_id required" }, { status: 400 });
  }

  try {
    const favorites = await prisma.favorite.findMany({
      where: { user_id },
      select: { movie_id: true, id: true },
    });

    const moviesData = await Promise.all(
      favorites.map(async (f) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${f.movie_id}?api_key=137772c7c1451abb30832465cd2bca39`
        );
        return res.json();
      })
    );

    return NextResponse.json(moviesData);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Cannot fetch favorites" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const movie_id = Number(url.searchParams.get("id"));

    const user_id = url.searchParams.get("user_id");

    if (!movie_id || !user_id) {
      return NextResponse.json({ error: "movie_id and user_id required" }, { status: 400 });
    }

    const deletedFavorite = await prisma.favorite.deleteMany({
      where: { user_id, movie_id: movie_id },
    });

    return NextResponse.json({ success: true, deletedFavorite });
  } catch (err) {
    console.error("Error deleting favoriteError deleting favorite:", err);
    return NextResponse.json({ error: "Cannot delete favorite" }, { status: 500 });
  }
}

