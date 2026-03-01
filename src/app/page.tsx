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
      <section className="relative overflow-hidden bg-gray-50 border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">

            {/* Left Column: Text & Search */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 z-10 mx-auto lg:mx-0 max-w-2xl lg:max-w-none">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20 text-xs font-semibold uppercase tracking-wider">
                <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Koleksi Apartemen Pilihan
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight lg:leading-[1.1] mx-auto lg:mx-0">
                Temukan <br />
                Apartemen{" "}
                <span className="text-blue-600 dark:text-blue-500 relative whitespace-nowrap block mt-1 lg:inline lg:mt-0">
                  Impianmu
                  <svg className="absolute -bottom-1 lg:-bottom-2 left-0 w-full h-2 lg:h-3 text-blue-200 dark:text-blue-900/50" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 Q50,20 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Platform penyewaan apartemen terpercaya di seluruh Indonesia. Bandingkan harga, fasilitas, dan hubungi pemilik langsung via WhatsApp tanpa perantara.
              </p>

              {/* Search Form Card */}
              <div className="w-full max-w-lg lg:max-w-xl bg-white dark:bg-gray-900 rounded-2xl p-3 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-gray-800 mx-auto lg:mx-0">
                <form action="/search" method="GET" className="flex flex-col sm:flex-row gap-3">

                  <div className="flex-1 relative group">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <select
                      name="location"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:border-blue-400 transition-colors"
                      defaultValue=""
                    >
                      <option value="">Semua Lokasi</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      name="q"
                      placeholder="Nama apartemen..."
                      className="h-12 pl-11 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-medium focus-visible:ring-blue-500 shadow-none hover:border-blue-400 transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 px-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold tracking-wide shadow-md hover:shadow-lg transition-all"
                  >
                    Cari
                  </Button>
                </form>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-950 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}&backgroundColor=e2e8f0`} alt={`User ${i}`} className="h-full w-full object-cover" />
                    </div>
                  ))}
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white dark:ring-gray-950 bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300">
                    5k+
                  </div>
                </div>
                <span>Penyewa aktif setiap bulan.</span>
              </div>
            </div>

            {/* Right Column: Image Showcase 
                We use the featured apartments to construct a dynamic, slightly staggered collage.
            */}
            <div className="relative w-full h-[400px] lg:h-[500px] hidden md:block">
              {/* Decorative background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-[80px] -z-10" />

              {apartments.length >= 3 ? (
                <div className="relative w-full h-full">
                  {/* Main large image */}
                  <div className="absolute top-0 right-0 w-[80%] h-[65%] rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/60 dark:shadow-none border border-white dark:border-gray-800 z-20">
                    <img src={apartments[0].coverImageUrl} alt={apartments[0].name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white text-xs font-bold shadow-sm">
                      <MapPin className="h-3 w-3 text-blue-600 inline" /> {apartments[0].locationCity}
                    </div>
                  </div>
                  {/* Staggered secondary image - Bottom Left */}
                  <div className="absolute bottom-[5%] left-0 w-[55%] h-[40%] rounded-3xl overflow-hidden shadow-xl shadow-gray-200/60 dark:shadow-none border-4 border-white dark:border-gray-950 z-30">
                    <img src={apartments[1].coverImageUrl} alt={apartments[1].name} className="w-full h-full object-cover" />
                  </div>
                  {/* Staggered tertiary image - Bottom Right */}
                  <div className="absolute bottom-0 right-[10%] w-[40%] h-[35%] rounded-3xl overflow-hidden shadow-lg shadow-gray-200/60 dark:shadow-none border-4 border-white dark:border-gray-950 z-40">
                    <img src={apartments[2].coverImageUrl} alt={apartments[2].name} className="w-full h-full object-cover" />
                  </div>
                </div>
              ) : (
                // Fallback if less than 3 apartments exist
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200">
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <Building2 className="w-32 h-32 text-gray-400/50" />
                  </div>
                </div>
              )}
            </div>

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
