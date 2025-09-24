import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { movie_id } = await req.json();
  try {
    const favorite = await prisma.favorite.create({
      data: { movie_id: movie_id },
    });
    return NextResponse.json(favorite, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Cannot create favorite" }, { status: 500 });
  }
}


export async function GET(req:Request){
    const favorites = await prisma.favorite.findMany({
        select: {
            id: true,
            movie_id: true
        }
    })
    const moviesData = await Promise.all(
        favorites.map(async (f) => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${f.movie_id}?api_key=137772c7c1451abb30832465cd2bca39`);
            return res.json();
        })
    )
    return NextResponse.json(moviesData);
}




export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    const movieIdParam = url.searchParams.get("id")

    if (!movieIdParam) {
      return NextResponse.json({ error: "movie_id required" }, { status: 400 })
    }

    const movie_id = Number(movieIdParam)
    if (isNaN(movie_id)) {
      return NextResponse.json({ error: "movie_id must be a number" }, { status: 400 })
    }

    const deletedFavorite = await prisma.favorite.deleteMany({
      where: { movie_id },
    })

    return NextResponse.json({ success: true, deletedFavorite })
  } catch (err) {
    console.error("Ошибка при удалении favorite:", err)
    return NextResponse.json({ error: "Cannot delete favorite" }, { status: 500 })
  }
}
