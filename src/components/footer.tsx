import Link from "next/link";
import { Building2 } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
                                <Building2 className="h-4 w-4" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                ApartBook
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Temukan apartemen impianmu di seluruh Indonesia. Cari, bandingkan,
                            dan hubungi langsung pemilik properti via WhatsApp.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                            Menu
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/search"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Cari Apartemen
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                            Informasi
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            ApartBook adalah platform direktori apartemen yang membantu Anda
                            menemukan hunian ideal. Hubungi langsung pengelola properti tanpa
                            perantara.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t">
                    <p className="text-center text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} ApartBook. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
