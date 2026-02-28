"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Search, MapPin, SlidersHorizontal, Building2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ApartmentCard } from "@/components/apartment-card";
import { formatPrice } from "@/lib/utils-app";

interface ApartmentResult {
    id: string;
    name: string;
    slug: string;
    locationCity: string;
    coverImageUrl: string;
    startingPrice: number;
}

export function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [maxPrice, setMaxPrice] = useState<number>(
        Number(searchParams.get("maxPrice")) || 15000000
    );
    const [cities, setCities] = useState<string[]>([]);
    const [apartments, setApartments] = useState<ApartmentResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const fetchCities = useCallback(async () => {
        try {
            const res = await fetch("/api/cities");
            const data = await res.json();
            setCities(data);
        } catch (error) {
            console.error("Failed to fetch cities:", error);
        }
    }, []);

    const fetchApartments = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (location) params.set("location", location);
            if (query) params.set("q", query);
            if (maxPrice < 15000000) params.set("maxPrice", String(maxPrice));

            const res = await fetch(`/api/search?${params.toString()}`);
            const data = await res.json();
            setApartments(data);
        } catch (error) {
            console.error("Failed to fetch apartments:", error);
        } finally {
            setLoading(false);
        }
    }, [location, query, maxPrice]);

    useEffect(() => {
        fetchCities();
    }, [fetchCities]);

    useEffect(() => {
        fetchApartments();
    }, [fetchApartments]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (query) params.set("q", query);
        if (maxPrice < 15000000) params.set("maxPrice", String(maxPrice));
        router.push(`/search?${params.toString()}`);
    };

    const clearFilters = () => {
        setLocation("");
        setQuery("");
        setMaxPrice(15000000);
        router.push("/search");
    };

    const hasActiveFilters = location || query || maxPrice < 15000000;

    return (
        <main className="flex-1 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Cari Apartemen</h1>
                    <p className="text-muted-foreground mt-1">
                        {loading
                            ? "Mencari..."
                            : `${apartments.length} apartemen ditemukan`}
                    </p>
                </div>

                {/* Search Bar + Filters */}
                <div className="mb-8 space-y-4">
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cari nama apartemen..."
                                className="pl-10 h-11"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-11"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <SlidersHorizontal className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                        <Button type="submit" className="h-11 bg-blue-600 hover:bg-blue-700">
                            <Search className="h-4 w-4 mr-2" />
                            Cari
                        </Button>
                    </form>

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className="bg-muted/40 rounded-xl p-6 border space-y-6 animate-in slide-in-from-top-2 duration-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Location Filter */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        Lokasi
                                    </Label>
                                    <select
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        <option value="">Semua Kota</option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Max Price Filter */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">
                                        Harga Maksimal: {formatPrice(maxPrice)}
                                    </Label>
                                    <Slider
                                        value={[maxPrice]}
                                        onValueChange={(v) => setMaxPrice(v[0])}
                                        min={1000000}
                                        max={15000000}
                                        step={500000}
                                        className="mt-3"
                                    />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>{formatPrice(1000000)}</span>
                                        <span>{formatPrice(15000000)}</span>
                                    </div>
                                </div>
                            </div>

                            {hasActiveFilters && (
                                <div className="flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="text-muted-foreground"
                                    >
                                        <X className="h-4 w-4 mr-1" />
                                        Reset Filter
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Results */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl border bg-muted/40 animate-pulse aspect-[4/3]"
                            />
                        ))}
                    </div>
                ) : apartments.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {apartments.map((apt) => (
                            <ApartmentCard
                                key={apt.id}
                                name={apt.name}
                                slug={apt.slug}
                                locationCity={apt.locationCity}
                                coverImageUrl={apt.coverImageUrl}
                                startingPrice={apt.startingPrice}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <Building2 className="h-16 w-16 mx-auto text-muted-foreground/40" />
                        <h3 className="mt-4 text-lg font-semibold text-muted-foreground">
                            Tidak ada hasil
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Coba ubah filter pencarian Anda
                        </p>
                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={clearFilters}
                            >
                                Reset Filter
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
