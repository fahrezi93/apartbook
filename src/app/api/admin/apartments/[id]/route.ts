import { NextResponse } from "next/server";
import {
    getApartmentById,
    updateApartment,
    deleteApartment,
} from "@/lib/queries";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const apartment = await getApartmentById(id);
    if (!apartment) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(apartment);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const apartment = await updateApartment(id, {
        name: body.name,
        locationCity: body.locationCity,
        address: body.address,
        description: body.description,
        facilities: body.facilities,
        contactWa: body.contactWa,
        coverImageUrl: body.coverImageUrl,
    });
    return NextResponse.json(apartment);
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await deleteApartment(id);
    return NextResponse.json({ success: true });
}
