import { Building2, DoorOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    let apartmentCount = 0;
    let roomCount = 0;
    try {
        const counts = await Promise.all([
            prisma.apartment.count(),
            prisma.room.count(),
        ]);
        apartmentCount = counts[0];
        roomCount = counts[1];
    } catch (error) {
        console.log("Failed to fetch admin stats (Database disconnected)");
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Selamat datang di admin panel ApartBook
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Apartemen
                                </p>
                                <p className="text-3xl font-bold">{apartmentCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
                                <DoorOpen className="h-6 w-6 text-violet-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Kamar</p>
                                <p className="text-3xl font-bold">{roomCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
