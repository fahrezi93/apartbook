import Link from "next/link";
import { Search, Building2, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ApartmentCard } from "@/components/apartment-card";
import { getFeaturedApartments, getAllCities } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [apartments, cities] = await Promise.all([
    getFeaturedApartments(),
    getAllCities(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-blue-600 text-sm font-semibold uppercase tracking-wider">
              <Building2 className="h-4 w-4" />
              <span>Direktori Apartemen Terlengkap</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-gray-50">
              Temukan Apartemen{" "}
              <span className="text-blue-600 dark:text-blue-500">
                Impianmu
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Cari apartemen terbaik di seluruh Indonesia. Bandingkan harga,
              fasilitas, dan hubungi langsung pengelola via WhatsApp.
            </p>

            {/* Search Form */}
            <form
              action="/search"
              method="GET"
              className="mt-8 bg-white dark:bg-gray-950 rounded-2xl p-3 md:p-4 border border-gray-200 dark:border-gray-800 shadow-sm max-w-4xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    name="location"
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="">
                      Semua Kota
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    name="q"
                    placeholder="Cari nama apartemen..."
                    className="h-12 pl-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus-visible:ring-blue-500 shadow-none"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-none"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Cari
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Apartments */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Apartemen Unggulan
              </h2>
              <p className="text-muted-foreground mt-2">
                Pilihan apartemen terbaik yang kami rekomendasikan
              </p>
            </div>
            <Link href="/search">
              <Button variant="outline" className="hidden sm:flex">
                Lihat Semua
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          {apartments.length > 0 ? (
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
            <div className="text-center py-16">
              <Building2 className="h-16 w-16 mx-auto text-muted-foreground/40" />
              <h3 className="mt-4 text-lg font-semibold text-muted-foreground">
                Belum ada apartemen
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Apartemen akan segera ditambahkan.
              </p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link href="/search">
              <Button variant="outline">
                Lihat Semua Apartemen
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
