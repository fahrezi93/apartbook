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
                    <Badge className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm font-medium px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[10px] sm:text-xs">
                        <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 text-gray-500" />
                        {locationCity}
                    </Badge>
                </div>
                <CardContent className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
                    <h3 className="font-semibold text-sm sm:text-lg line-clamp-1 group-hover:text-blue-600 transition-colors text-gray-900 dark:text-gray-100 leading-tight">
                        {name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1">
                        <span className="text-[10px] sm:text-sm text-gray-500 leading-none sm:leading-normal">Mulai dari</span>
                        <div className="flex items-baseline gap-0.5 sm:gap-1">
                            <span className="text-sm sm:text-lg font-bold text-blue-600 dark:text-blue-500 leading-none sm:leading-normal">
                                {formatPrice(startingPrice)}
                            </span>
                            <span className="text-[10px] sm:text-xs text-gray-500">/bulan</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
