import { NextResponse } from "next/server";
import { getAllCities } from "@/lib/queries";

export async function GET() {
    const cities = await getAllCities();
    return NextResponse.json(cities);
}
