import { NextResponse } from "next/server";
import { updateRoom, deleteRoom } from "@/lib/queries";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const room = await updateRoom(id, {
        typeName: body.typeName,
        pricePerMonth: body.pricePerMonth,
        roomSize: body.roomSize,
        description: body.description,
        imageUrl: body.imageUrl,
    });
    return NextResponse.json(room);
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await deleteRoom(id);
    return NextResponse.json({ success: true });
}
