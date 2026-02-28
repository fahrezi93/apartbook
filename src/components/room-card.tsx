import Image from "next/image";
import { MessageCircle, Maximize2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, generateWhatsAppUrl } from "@/lib/utils-app";

interface RoomCardProps {
    typeName: string;
    pricePerMonth: number;
    roomSize: string;
    description: string;
    imageUrl: string;
    apartmentName: string;
    contactWa: string;
}

export function RoomCard({
    typeName,
    pricePerMonth,
    roomSize,
    description,
    imageUrl,
    apartmentName,
    contactWa,
}: RoomCardProps) {
    const whatsappUrl = generateWhatsAppUrl(contactWa, apartmentName, typeName);

    return (
        <Card className="overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative w-full sm:w-48 md:w-56 aspect-video sm:aspect-square shrink-0 overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={`${apartmentName} - ${typeName}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 224px"
                    />
                </div>

                {/* Content */}
                <CardContent className="flex flex-col justify-between p-4 flex-1">
                    <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h4 className="font-semibold text-lg">{typeName}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="text-xs">
                                        <Maximize2 className="h-3 w-3 mr-1" />
                                        {roomSize}
                                    </Badge>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-xl font-bold text-blue-600">
                                    {formatPrice(pricePerMonth)}
                                </p>
                                <p className="text-xs text-muted-foreground">/bulan</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {description}
                        </p>
                    </div>

                    <div className="mt-4">
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Booking via WhatsApp
                            </Button>
                        </a>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}
