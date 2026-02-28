import { prisma } from "./db";
import { Prisma } from "@prisma/client";

// ==================== PUBLIC QUERIES ====================

export async function getFeaturedApartments() {
    try {
        const apartments = await prisma.apartment.findMany({
            take: 6,
            orderBy: { createdAt: "desc" },
            include: {
                rooms: {
                    orderBy: { pricePerMonth: "asc" },
                    take: 1,
                },
            },
        });

        return apartments.map((apt) => ({
            ...apt,
            startingPrice: apt.rooms[0]?.pricePerMonth ?? 0,
        }));
    } catch (error) {
        console.log("Failed to get featured apartments (Database disconnected)");
        return [];
    }
}

export async function searchApartments(params: {
    location?: string;
    q?: string;
    maxPrice?: number;
}) {
    try {
        const where: Prisma.ApartmentWhereInput = {};

        if (params.location) {
            where.locationCity = {
                equals: params.location,
                mode: "insensitive",
            };
        }

        if (params.q) {
            where.OR = [
                { name: { contains: params.q, mode: "insensitive" } },
                { address: { contains: params.q, mode: "insensitive" } },
                { description: { contains: params.q, mode: "insensitive" } },
            ];
        }

        let apartments = await prisma.apartment.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: {
                rooms: {
                    orderBy: { pricePerMonth: "asc" },
                    take: 1,
                },
            },
        });

        if (params.maxPrice) {
            apartments = apartments.filter(
                (apt) =>
                    apt.rooms.length > 0 && apt.rooms[0].pricePerMonth <= params.maxPrice!
            );
        }

        return apartments.map((apt) => ({
            ...apt,
            startingPrice: apt.rooms[0]?.pricePerMonth ?? 0,
        }));
    } catch (error) {
        console.log("Failed to search apartments (Database disconnected)");
        return [];
    }
}

export async function getApartmentBySlug(slug: string) {
    try {
        return await prisma.apartment.findUnique({
            where: { slug },
            include: {
                rooms: {
                    orderBy: { pricePerMonth: "asc" },
                },
            },
        });
    } catch (error) {
        console.log("Failed to get apartment by slug (Database disconnected)");
        return null;
    }
}

export async function getAllCities() {
    try {
        const result = await prisma.apartment.findMany({
            select: { locationCity: true },
            distinct: ["locationCity"],
            orderBy: { locationCity: "asc" },
        });
        return result.map((r) => r.locationCity);
    } catch (error) {
        console.log("Failed to get all cities (Database disconnected)");
        return [];
    }
}

// ==================== ADMIN QUERIES ====================

export async function getAllApartments() {
    try {
        return await prisma.apartment.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: { select: { rooms: true } },
            },
        });
    } catch (error) {
        console.log("Failed to get all apartments (Database disconnected)");
        return [];
    }
}

export async function getApartmentById(id: string) {
    try {
        return await prisma.apartment.findUnique({
            where: { id },
            include: { rooms: true },
        });
    } catch (error) {
        console.log("Failed to get apartment by id (Database disconnected)");
        return null;
    }
}

export async function createApartment(
    data: Omit<Prisma.ApartmentCreateInput, "slug"> & { slug?: string }
) {
    const slug =
        data.slug ||
        data.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

    return prisma.apartment.create({
        data: { ...data, slug },
    });
}

export async function updateApartment(
    id: string,
    data: Prisma.ApartmentUpdateInput
) {
    return prisma.apartment.update({
        where: { id },
        data,
    });
}

export async function deleteApartment(id: string) {
    return prisma.apartment.delete({
        where: { id },
    });
}

// Room CRUD
export async function getRoomsByApartment(apartmentId: string) {
    try {
        return await prisma.room.findMany({
            where: { apartmentId },
            orderBy: { pricePerMonth: "asc" },
        });
    } catch (error) {
        console.log("Failed to get rooms by apartment (Database disconnected)");
        return [];
    }
}

export async function createRoom(data: Prisma.RoomUncheckedCreateInput) {
    return prisma.room.create({ data });
}

export async function updateRoom(
    id: string,
    data: Prisma.RoomUncheckedUpdateInput
) {
    return prisma.room.update({ where: { id }, data });
}

export async function deleteRoom(id: string) {
    return prisma.room.delete({ where: { id } });
}

// Admin auth
export async function getAdminByUsername(username: string) {
    try {
        return await prisma.admin.findUnique({ where: { username } });
    } catch (error) {
        console.log("Failed to get admin by username (Database disconnected)");
        return null;
    }
}
