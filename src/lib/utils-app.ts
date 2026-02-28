export function formatPrice(price: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

export function generateWhatsAppUrl(
    contactWa: string,
    apartmentName: string,
    roomTypeName: string
): string {
    const message = `Halo, saya tertarik dengan apartemen ${apartmentName} tipe kamar ${roomTypeName}. Apakah masih tersedia?`;
    return `https://wa.me/${contactWa}?text=${encodeURIComponent(message)}`;
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}
