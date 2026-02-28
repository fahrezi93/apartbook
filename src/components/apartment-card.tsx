import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils-app";

interface ApartmentCardProps {
    name: string;
    slug: string;
    locationCity: string;
    coverImageUrl: string;
    startingPrice: number;
}

export function ApartmentCard({
    name,
    slug,
    locationCity,
    coverImageUrl,
    startingPrice,
}: ApartmentCardProps) {
    return (
        <Link href={`/apartment/${slug}`} className="group block">
            <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 dark:border-gray-800 dark:bg-gray-950">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <Image
                        src={coverImageUrl}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Removed bg-gradient entirely */}
                    <Badge className="absolute top-3 right-3 bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm font-medium">
                        <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                        {locationCity}
                    </Badge>
                </div>
                <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors text-gray-900 dark:text-gray-100">
                        {name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm text-gray-500">Mulai dari</span>
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-500">
                            {formatPrice(startingPrice)}
                        </span>
                        <span className="text-xs text-gray-500">/bulan</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
