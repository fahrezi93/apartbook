import { NextResponse } from "next/server";
import { searchApartments } from "@/lib/queries";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const location = searchParams.get("location") || undefined;
    const q = searchParams.get("q") || undefined;
    const maxPrice = searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined;

    const apartments = await searchApartments({ location, q, maxPrice });

    return NextResponse.json(apartments);
}
