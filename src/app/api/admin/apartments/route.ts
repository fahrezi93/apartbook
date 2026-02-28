import { NextResponse } from "next/server";
import { getAllApartments, createApartment } from "@/lib/queries";
import { slugify } from "@/lib/utils-app";

export async function GET() {
    const apartments = await getAllApartments();
    return NextResponse.json(apartments);
}

export async function POST(request: Request) {
    const body = await request.json();
    const apartment = await createApartment({
        name: body.name,
        slug: slugify(body.name),
        locationCity: body.locationCity,
        address: body.address,
        description: body.description,
        facilities: body.facilities,
        contactWa: body.contactWa,
        coverImageUrl: body.coverImageUrl,
    });
    return NextResponse.json(apartment, { status: 201 });
}
