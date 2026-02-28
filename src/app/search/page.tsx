import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SearchContent } from "./search-content";

export const metadata = {
    title: "Cari Apartemen - ApartBook",
    description: "Cari dan temukan apartemen terbaik sesuai kebutuhan Anda.",
};

export default function SearchPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <Suspense
                fallback={
                    <div className="flex-1 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                    </div>
                }
            >
                <SearchContent />
            </Suspense>
            <Footer />
        </div>
    );
}
