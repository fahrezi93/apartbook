import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowLeft, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RoomCard } from "@/components/room-card";
import { getApartmentBySlug } from "@/lib/queries";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ApartmentDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const apartment = await getApartmentBySlug(slug);

    if (!apartment) {
        notFound();
    }

    const facilities: string[] = (() => {
        try {
            if (typeof apartment.facilities === "string") {
                return JSON.parse(apartment.facilities);
            }
            if (Array.isArray(apartment.facilities)) {
                return apartment.facilities as string[];
            }
            return [];
        } catch {
            return [];
        }
    })();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Cover Image */}
                <div className="relative h-64 md:h-96 overflow-hidden">
                    <Image
                        src={apartment.coverImageUrl}
                        alt={apartment.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                        <div className="mx-auto max-w-7xl">
                            <Link href="/search">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white/80 hover:text-white hover:bg-white/10 mb-4"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-1" />
                                    Kembali
                                </Button>
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                {apartment.name}
                            </h1>
                            <div className="flex items-center gap-2 mt-2 text-white/80">
                                <MapPin className="h-4 w-4" />
                                <span>
                                    {apartment.address}, {apartment.locationCity}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <section>
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-blue-600" />
                                    Tentang Apartemen
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {apartment.description}
                                </p>
                            </section>

                            <Separator />

                            {/* Facilities */}
                            <section>
                                <h2 className="text-xl font-semibold mb-4">Fasilitas</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {facilities.map((facility, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                                            <span>{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <Separator />

                            {/* Rooms */}
                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    Tipe Kamar ({apartment.rooms.length})
                                </h2>
                                <div className="space-y-4">
                                    {apartment.rooms.map((room) => (
                                        <RoomCard
                                            key={room.id}
                                            typeName={room.typeName}
                                            pricePerMonth={room.pricePerMonth}
                                            roomSize={room.roomSize}
                                            description={room.description}
                                            imageUrl={room.imageUrl}
                                            apartmentName={apartment.name}
                                            contactWa={apartment.contactWa}
                                        />
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="rounded-xl border p-6 bg-muted/30 sticky top-24 space-y-4">
                                <h3 className="font-semibold text-lg">Info Kontak</h3>
                                <p className="text-sm text-muted-foreground">
                                    Tertarik dengan apartemen ini? Hubungi pengelola langsung via
                                    WhatsApp untuk informasi lebih lanjut.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{apartment.locationCity}</span>
                                    </div>
                                </div>
                                {apartment.rooms.length > 0 && (
                                    <a
                                        href={`https://wa.me/${apartment.contactWa}?text=${encodeURIComponent(`Halo, saya tertarik dengan apartemen ${apartment.name}. Bisa info lebih lanjut?`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white mt-2">
                                            Hubungi via WhatsApp
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
