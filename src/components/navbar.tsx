"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white transition-colors group-hover:bg-blue-700">
                            <Building2 className="h-4 w-4" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            ApartBook
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link href="/">
                            <Button variant="ghost" className="text-sm font-medium">
                                Beranda
                            </Button>
                        </Link>
                        <Link href="/search">
                            <Button variant="ghost" className="text-sm font-medium">
                                <Search className="h-4 w-4 mr-1" />
                                Cari Apartemen
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-accent"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t py-4 space-y-2">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/search"
                            className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Cari Apartemen
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
