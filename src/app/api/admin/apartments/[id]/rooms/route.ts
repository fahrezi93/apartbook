import { NextResponse } from "next/server";
import { getRoomsByApartment, createRoom } from "@/lib/queries";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const rooms = await getRoomsByApartment(id);
    return NextResponse.json(rooms);
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const room = await createRoom({
        apartmentId: id,
        typeName: body.typeName,
        pricePerMonth: body.pricePerMonth,
        roomSize: body.roomSize,
        description: body.description,
        imageUrl: body.imageUrl,
    });
    return NextResponse.json(room, { status: 201 });
}
