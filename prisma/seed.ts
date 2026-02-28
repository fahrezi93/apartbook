import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Create admin user
    const passwordHash = await bcrypt.hash("admin123", 12);
    await prisma.admin.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            username: "admin",
            passwordHash,
        },
    });

    // Create 20 apartments with rooms
    const apartments = [
        {
            name: "Apartemen Sudirman Park",
            slug: "apartemen-sudirman-park",
            locationCity: "Jakarta Pusat",
            address: "Jl. KH. Mas Mansyur Kav. 35, Tanah Abang",
            description: "Apartemen Sudirman Park terletak di jantung kota Jakarta dengan akses mudah ke berbagai fasilitas publik. Dilengkapi dengan kolam renang, gym, minimarket, dan keamanan 24 jam. Lokasi strategis dekat stasiun MRT dan pusat bisnis Sudirman.",
            facilities: JSON.stringify(["Kolam Renang", "Gym", "Minimarket", "Keamanan 24 Jam", "Parkir", "Laundry", "Taman Bermain"]),
            contactWa: "6281234567890",
            coverImageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
            rooms: [
                { typeName: "Studio", pricePerMonth: 4500000, roomSize: "21 m²", description: "Kamar studio yang nyaman dengan desain modern. Dilengkapi AC, water heater, dan kitchen set.", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80" },
                { typeName: "2 Bedroom", pricePerMonth: 9000000, roomSize: "50 m²", description: "Unit 2 kamar tidur cocok untuk keluarga kecil. Ruang tamu luas, dapur bersih, dan balkon.", imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" },
            ],
        },
        {
            name: "Green Bay Pluit",
            slug: "green-bay-pluit",
            locationCity: "Jakarta Utara",
            address: "Jl. Pluit Karang Ayu No.1, Pluit, Penjaringan",
            description: "Green Bay Pluit adalah apartemen modern di kawasan Pluit dengan pemandangan laut yang indah. Fasilitas lengkap termasuk mall, kolam renang infinity, dan akses langsung ke pusat perbelanjaan.",
            facilities: JSON.stringify(["Kolam Renang Infinity", "Mall", "Gym", "Jogging Track", "Keamanan 24 Jam", "Parkir", "Sky Garden"]),
            contactWa: "6281298765432",
            coverImageUrl: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80",
            rooms: [
                { typeName: "Studio", pricePerMonth: 3800000, roomSize: "24 m²", description: "Studio apartment dengan view laut. Furnished lengkap siap huni.", imageUrl: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80" },
                { typeName: "2 Bedroom", pricePerMonth: 7500000, roomSize: "45 m²", description: "Unit 2BR yang luas dengan pemandangan laut. Cocok untuk keluarga.", imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80" },
            ],
        },
        {
            name: "Apartemen Gateway Pasteur",
            slug: "apartemen-gateway-pasteur",
            locationCity: "Bandung",
            address: "Jl. Gunung Batu No.203, Sukaraja, Cicendo",
            description: "Gateway Pasteur Bandung adalah apartemen strategis di pintu masuk kota Bandung. Dekat dengan pintu tol Pasteur dan berbagai pusat perbelanjaan. Udara sejuk khas Bandung membuat tinggal di sini sangat nyaman.",
            facilities: JSON.stringify(["Kolam Renang", "Gym", "Food Court", "Minimarket", "Keamanan 24 Jam", "Shuttle Bus"]),
            contactWa: "6281377889900",
            coverImageUrl: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80",
            rooms: [
                { typeName: "Studio", pricePerMonth: 2800000, roomSize: "22 m²", description: "Studio minimalis yang nyaman. Fully furnished dengan pemandangan gunung.", imageUrl: "https://images.unsplash.com/photo-1598928506311-c55ez637a58c?w=800&q=80" },
                { typeName: "1 Bedroom", pricePerMonth: 4200000, roomSize: "33 m²", description: "Satu kamar tidur dengan ruang tamu. Cocok untuk pasangan muda.", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
            ],
        },
        {
            name: "Puncak Bukit Golf",
            slug: "puncak-bukit-golf",
            locationCity: "Surabaya",
            address: "Jl. Citraland, Sambikerep, Lakarsantri",
            description: "Apartemen premium di kawasan Citraland Surabaya dengan pemandangan lapangan golf. Lingkungan asri dan tenang, cocok untuk keluarga yang menginginkan hunian berkualitas.",
            facilities: JSON.stringify(["Golf Course View", "Kolam Renang", "Gym", "Tennis Court", "Sauna", "Keamanan 24 Jam", "Playground"]),
            contactWa: "6281244556677",
            coverImageUrl: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80",
            rooms: [
                { typeName: "Studio", pricePerMonth: 3200000, roomSize: "26 m²", description: "Studio luas dengan view golf course. Desain modern dan nyaman.", imageUrl: "https://images.unsplash.com/photo-1630699144867-37acec97df5a?w=800&q=80" },
                { typeName: "1 Bedroom", pricePerMonth: 5000000, roomSize: "38 m²", description: "Unit 1BR premium dengan balkon menghadap lapangan golf.", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
            ],
        },
        {
            name: "Taman Anggrek Residence",
            slug: "taman-anggrek-residence",
            locationCity: "Jakarta Barat",
            address: "Jl. Letjen S. Parman Kav. 21, Slipi",
            description: "Taman Anggrek Residence terletak di lokasi premium Jakarta Barat. Terintegrasi langsung dengan Mall Taman Anggrek, menjadikan akses belanja dan hiburan sangat mudah. Dekat dengan berbagai rumah sakit dan sekolah berkualitas.",
            facilities: JSON.stringify(["Direct Mall Access", "Kolam Renang", "Gym", "Sauna", "Jogging Track", "BBQ Area", "Keamanan 24 Jam"]),
            contactWa: "6281355667788",
            coverImageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
            rooms: [
                { typeName: "Studio", pricePerMonth: 5000000, roomSize: "26 m²", description: "Studio mewah dengan akses langsung ke mall. Fully furnished.", imageUrl: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=800&q=80" },
                { typeName: "2 Bedroom", pricePerMonth: 10000000, roomSize: "52 m²", description: "Unit 2BR premium dengan interior designer. View city skyline.", imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80" },
            ],
        },
        {
            name: "Podomoro City Deli",
            slug: "podomoro-city-deli",
            locationCity: "Medan",
            address: "Jl. Putri Hijau No.1, Kesawan, Medan Barat",
            description: "Podomoro City Deli Medan adalah apartemen pertama berkelas internasional di kota Medan. Berlokasi di pusat kota dengan akses mudah ke berbagai destinasi wisata dan kuliner khas Medan.",
            facilities: JSON.stringify(["Kolam Renang", "Sky Lounge", "Gym", "Co-working Space", "Minimarket", "Keamanan 24 Jam"]),
            contactWa: "6281266778899",
            coverImageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
            rooms: [
                { typeName: "Studio", pricePerMonth: 2500000, roomSize: "20 m²", description: "Studio compact dengan desain modern. Cocok untuk mahasiswa dan profesional muda.", imageUrl: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80" },
                { typeName: "1 Bedroom", pricePerMonth: 3800000, roomSize: "32 m²", description: "Unit 1BR nyaman dengan dapur bersih dan ruang kerja.", imageUrl: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80" },
            ],
        },
        {
            name: "Apartemen Kalibata City",
            slug: "apartemen-kalibata-city",
            locationCity: "Jakarta Selatan",
            address: "Jl. Raya Kalibata No.1, Rawajati, Pancoran",
            description: "Kalibata City adalah salah satu apartemen terpopuler di Jakarta Selatan dengan konsep superblock. Memiliki fasilitas lengkap dan akses transportasi yang sangat mudah, sangat cocok bagi para pekerja di area CBD dan sudirman.",
            facilities: JSON.stringify(["Mall Kalibata City Square", "Kolam Renang", "Taman Bermain", "Keamanan 24 Jam", "Stasiun KRL Terdekat", "Food Court"]),
            contactWa: "6281122334455",
            coverImageUrl: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80",
            rooms: [
                { typeName: "2 Bedroom", pricePerMonth: 4200000, roomSize: "33 m²", description: "Kamar tidur 2 dengan dapur dan kamar mandi. Tersedia Wi-Fi dan smart TV.", imageUrl: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=800&q=80" },
                { typeName: "Studio", pricePerMonth: 3000000, roomSize: "21 m²", description: "Kamar studio minimalis yang sudah full furnished.", imageUrl: "https://images.unsplash.com/photo-1522771731478-4416cd6f52ad?w=800&q=80" },
            ],
        },
        {
            name: "Pakuwon Mall Mansion",
            slug: "pakuwon-mall-mansion",
            locationCity: "Surabaya",
            address: "Pakuwon Mall, Jl. Puncak Indah Lontar No.2",
            description: "Tower eksklusif di atas salah satu mall terbesar di Indonesia. Menawarkan kemewahan hidup dengan segala kemudahan. Memiliki lobi bintang lima dan pemandangan luar biasa kota Surabaya.",
            facilities: JSON.stringify(["Akses Pakuwon Mall", "Infinity Pool", "Yoga Studio", "Fitness Center", "BBQ Area", "Security 24/7"]),
            contactWa: "6281333445566",
            coverImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
            rooms: [
                { typeName: "1 Bedroom Executive", pricePerMonth: 6500000, roomSize: "40 m²", description: "Unit satu kamar paling mewah dengan bathtub.", imageUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80" },
                { typeName: "2 Bedroom Suite", pricePerMonth: 9500000, roomSize: "68 m²", description: "Suite dua kamar yang luas untuk keluarga eksekutif.", imageUrl: "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800&q=80" },
            ],
        },
        {
            name: "Margonda Residence",
            slug: "margonda-residence",
            locationCity: "Depok",
            address: "Jl. Margonda Raya Kav. 461, Beji",
            description: "Apartemen yang sangat populer di kalangan mahasiswa UI dan Gunadarma. Lokasinya persis di jalan utama Margonda dengan akses langsung ke tempat makan, toko buku, dan universitas.",
            facilities: JSON.stringify(["Kolam Renang", "Kantin Mahasiswa", "Laundry", "Minimarket 24 Jam", "Area Parkir Luas", "Akses Kampus"]),
            contactWa: "6281988776655",
            coverImageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
            rooms: [
                { typeName: "Studio M-Res", pricePerMonth: 2200000, roomSize: "20 m²", description: "Studio khusus untuk pelajar/mahasiswa. Harga bersahabat.", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80" },
            ],
        },
        {
            name: "Bintaro Park View",
            slug: "bintaro-park-view",
            locationCity: "Tangerang Selatan",
            address: "Jl. Bintaro Permai Raya No.35-36, Pesanggrahan",
            description: "Apartemen bernuansa taman di Selatan Jakarta. Menawarkan keseimbangan antara hunian yang asri dan akses cepat menuju jalan tol Bintaro serta BSD. Cocok untuk milenial yang memiliki mobilitas tinggi.",
            facilities: JSON.stringify(["Thematic Garden", "Swimming Pool", "Kids Pool", "Fitness Center", "Klinik 24 Jam", "Shuttle Bus"]),
            contactWa: "6287711223344",
            coverImageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            rooms: [
                { typeName: "Studio Classic", pricePerMonth: 3500000, roomSize: "23 m²", description: "Studio dengan desain rapi dan siap huni. Dinding bata ekspos.", imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80" },
                { typeName: "2 Bedroom Corner", pricePerMonth: 6000000, roomSize: "42 m²", description: "Kamar sudut dengan jendela lebih lega dan view taman.", imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80" },
            ],
        },
        {
            name: "Parahyangan Residences",
            slug: "parahyangan-residences",
            locationCity: "Bandung",
            address: "Jl. Ciumbuleuit No.125, Hegarmanah",
            description: "Apartemen mewah yang terletak di kawasan premium Ciumbuleuit, Bandung. Udaranya sejuk dengan view pegunungan yang memukau. Dekat dengan Universitas Katolik Parahyangan (UNPAR).",
            facilities: JSON.stringify(["Infinity Pool View Gunung", "Rooftop Garden", "Gym Center", "Food Court", "Minimarket Premium", "Security 24 Hours", "Student Center"]),
            contactWa: "6281233445566",
            coverImageUrl: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80",
            rooms: [
                { typeName: "Studio Mountain View", pricePerMonth: 4000000, roomSize: "28 m²", description: "Kamar studio eksklusif dengan view pegunungan Tangkuban Perahu.", imageUrl: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80" },
                { typeName: "1 Bedroom Luxury", pricePerMonth: 5500000, roomSize: "36 m²", description: "Cocok untuk liburan staycation keluarga kecil.", imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80" },
            ],
        },
        {
            name: "Vida View Makassar",
            slug: "vida-view-makassar",
            locationCity: "Makassar",
            address: "Jl. Topaz Raya, Masale, Panakkukang",
            description: "Terletak di pusat komersial Panakkukang, Vida View menghadirkan konsep hunian modern pertama di wilayah Timur Indonesia dengan fasilitas layaknya resort bintang lima.",
            facilities: JSON.stringify(["Resort Style Pool", "Fitness Center", "BBQ Area", "Business Center", "Food Promenade", "24 Hr Security & CCTV"]),
            contactWa: "6285211223344",
            coverImageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
            rooms: [
                { typeName: "1 Bedroom", pricePerMonth: 4500000, roomSize: "34 m²", description: "Unit satu kamar lengkap dengan dapur dan ruang makan kecil.", imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80" },
                { typeName: "3 Bedroom Family", pricePerMonth: 8500000, roomSize: "75 m²", description: "Kamar 3BR yang luas untuk seluruh keluarga, include 2 kamar mandi.", imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80" },
            ],
        },
        {
            name: "Pondok Indah Residences",
            slug: "pondok-indah-residences",
            locationCity: "Jakarta Selatan",
            address: "Jl. Kartika Utama No.47, Pondok Pinang, Kebayoran Lama",
            description: "Standar kemewahan tertinggi di bilangan Pondok Indah, ditujukan untuk kaum ekspatriat dan eksekutif atas. Terhubung langsung melalui terowongan asik dengan Pondok Indah Mall (PIM).",
            facilities: JSON.stringify(["Tunnel Access to PIM", "Olympic Size Pool", "Indoor Pool", "Tennis Court", "Luxury Lounge", "VIP Lift", "Private Concierge"]),
            contactWa: "6281199887766",
            coverImageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
            rooms: [
                { typeName: "2 Bedroom Exclusive", pricePerMonth: 25000000, roomSize: "110 m²", description: "Furnished by interior designer kelas atas dengan material import.", imageUrl: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=800&q=80" },
                { typeName: "Penthouse Suite", pricePerMonth: 45000000, roomSize: "185 m²", description: "Hunian termewah dengan pemandangan sky line 360 derajat.", imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" },
            ],
        },
        {
            name: "Gading Nias Residence",
            slug: "gading-nias-residence",
            locationCity: "Jakarta Utara",
            address: "Jl. Pegangsaan Dua No.3, Kelapa Gading",
            description: "Apartemen favorit di Kelapa Gading yang mengutamakan kelengkapan fasilitas dan harga terjangkau. Lokasi dikelilingi ribuan sentra kuliner, sekolah, dan tempat wisata kuliner lainnya.",
            facilities: JSON.stringify(["Food Court Makanan Laut", "Kolam Renang", "Klinik Kesehatan", "Pasar Modern", "Taman Reflexology", "Area Bermain Anak"]),
            contactWa: "6281312345678",
            coverImageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
            rooms: [
                { typeName: "Studio Basic", pricePerMonth: 1800000, roomSize: "21 m²", description: "Unit kosongan / semi-furnished untuk yang ingin mendesain kamarnya sendiri.", imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80" },
                { typeName: "2 Bedroom Furnished", pricePerMonth: 2800000, roomSize: "35 m²", description: "Kamar tidur 2 dengan AC di masing-masing ruangan.", imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80" },
            ],
        },
        {
            name: "Hquarters Business Residence",
            slug: "hq-business-residence",
            locationCity: "Bandung",
            address: "Jl. Asia Afrika No.158, Paledang, Lengkong",
            description: "Apartemen sekaligus ruang kantor SOHO (Small Office Home Office) elegan di kawasan perkantoran heritage Jalan Asia Afrika, Bandung. Diperuntukkan bagi pengusaha yang mencari mix-use building.",
            facilities: JSON.stringify(["SOHO Concept", "Meeting Rooms", "Rooftop Pool", "Restaurant & Cafe Inhouse", "High Speed Internet 1Gbps", "Smart Key Access"]),
            contactWa: "6281223344556",
            coverImageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
            rooms: [
                { typeName: "SOHO 1 Lantai", pricePerMonth: 8500000, roomSize: "55 m²", description: "Bisa berfungsi sebagai hunian mewah dan kantor kecil untuk 5 karyawan.", imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80" },
                { typeName: "SOHO Duplex 2 Lantai", pricePerMonth: 15000000, roomSize: "90 m²", description: "Pemisahan yang sangat jelas antara area tempat tinggal dan area bisnis.", imageUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80" },
            ],
        },
        {
            name: "Apartemen Dago Suites",
            slug: "apartemen-dago-suites",
            locationCity: "Bandung",
            address: "Jl. Sangkuriang No.13, Dago",
            description: "Terletak sangat strategis di area elit Dago. Sangat dekat ke ITB dan simpang Dago. Memiliki lingkungan belajar yang kondusif sehingga menjadi apartemen idaman mahasiswa kedokteran dan teknik.",
            facilities: JSON.stringify(["Silent Room Area", "Kolam Renang Mewah", "Gymnasium", "24H Reading Room", "Keamanan Gate Access", "Resto Samping Kolam"]),
            contactWa: "6281355443322",
            coverImageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
            rooms: [
                { typeName: "1 Bedroom Elite", pricePerMonth: 5500000, roomSize: "36 m²", description: "Lengkap dengan meja belajar panjang dan fasilitas high-speed internet khusus.", imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80" },
            ],
        },
        {
            name: "Apartemen Gunung Putri Square",
            slug: "gunung-putri-square",
            locationCity: "Bogor",
            address: "Jl. Raya Mercedes Benz, Gunung Putri",
            description: "Apartemen modern pertama di kawasan timur Bogor. Ideal untuk para milenial yang bekerja di kawasan logistik dan industri Cibinong-Gunung Putri dengan akses dekat stasiun Nambo.",
            facilities: JSON.stringify(["Pasar Segar Gunung Putri", "Akses Stasiun Nambo", "Jogging Track Sejuk", "Kolam Renang", "Keamanan RFID", "Area Komersial Ruko"]),
            contactWa: "6281299887766",
            coverImageUrl: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?w=800&q=80",
            rooms: [
                { typeName: "Studio Standard", pricePerMonth: 1500000, roomSize: "22 m²", description: "Pilihan hemat untuk karyawan kawasan sekitar. Sewa termasuk service charge.", imageUrl: "https://images.unsplash.com/photo-1522771731478-4416cd6f52ad?w=800&q=80" },
                { typeName: "2 Bedroom Corner", pricePerMonth: 2500000, roomSize: "45 m²", description: "Unit dua kamar bebas banjir dan tidak berisik.", imageUrl: "https://images.unsplash.com/photo-1628592102751-ba83b0314276?w=800&q=80" },
            ],
        },
        {
            name: "Apartemen Meikarta",
            slug: "apartemen-meikarta",
            locationCity: "Bekasi",
            address: "South Cikarang, Bekasi Regency, West Java",
            description: "Kota mandiri masa depan Meikarta membawa fasilitas level internasional ke tengah Cikarang. Tinggal di sini Anda mendapatkan lanskap kota, central park, dan infrastruktur mobilitas cerdas.",
            facilities: JSON.stringify(["Central Park Danau Besar", "Lippo Mall", "International School Area", "Rumah Sakit Siloam", "Gym and Club House", "Shuttle Internal meikarta"]),
            contactWa: "6282112345678",
            coverImageUrl: "https://images.unsplash.com/photo-1473229649727-8919a31548e6?w=800&q=80",
            rooms: [
                { typeName: "Studio Type A", pricePerMonth: 1800000, roomSize: "22 m²", description: "Akses mudah ke area central park Meikarta.", imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80" },
                { typeName: "2 Bedroom Tower T", pricePerMonth: 3500000, roomSize: "48 m²", description: "Tower exclusive yang langsung terhubung ke mall komersial Meikarta.", imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80" },
                { typeName: "3 Bedroom Asian", pricePerMonth: 4800000, roomSize: "68 m²", description: "Pusat hunian lega bagi keluarga ekspatriat Asia di Cikarang.", imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" },
            ],
        },
        {
            name: "Gunnawangsa MERR",
            slug: "gunnawangsa-merr",
            locationCity: "Surabaya",
            address: "Jl. Kedung Baruk No.96, Rungkut",
            description: "Dikelilingi puluhan kampus swasta unggulan dan langsung menghadap ke jalan ring road Surabaya Timur (MERR). Hunian tinggi dengan panorama laut Suramadu bila cuaca sedang cerah.",
            facilities: JSON.stringify(["MERR Highway Access", "Sky Pool", "Hypermarket Transmart", "Food District MERR", "Gym & Spa area", "Keamanan Intercom"]),
            contactWa: "6281358586868",
            coverImageUrl: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80",
            rooms: [
                { typeName: "1 Bedroom East View", pricePerMonth: 3200000, roomSize: "36 m²", description: "Mendapat sinar mentari pagi dengan view arah Madura.", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
                { typeName: "2 Bedroom Corner City", pricePerMonth: 4800000, roomSize: "48 m²", description: "Kamar sudut menyajikan City Lite view surabaya malam hari yang indah.", imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" },
            ],
        },
        {
            name: "Apartemen Student Castle",
            slug: "student-castle-yogya",
            locationCity: "Yogyakarta",
            address: "Jl. Seturan Raya No.1, Caturtunggal, Depok, Sleman",
            description: "Satu-satunya apartemen khusus yang mengusung tema co-living pelajar dan mahasiswa di pusat pendidikan Jogjakarta. Hanya 10 menit ke kampus UPN, YKPN, dan Atma Jaya Yogyakarta.",
            facilities: JSON.stringify(["Student Co-working", "Perpustakaan Mini", "Billiard Room", "Infinity Pool Lantai 2", "Kantin Prasmanan", "Bike Parking", "Keamanan 24/7"]),
            contactWa: "6281778899000",
            coverImageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
            rooms: [
                { typeName: "Studio Classic Scholar", pricePerMonth: 2500000, roomSize: "23 m²", description: "Disewakan tahunan maupun bulanan, sangat direkomendasikan untuk pelajar rantau.", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80" },
            ],
        },
        {
            name: "East Coast Residence",
            slug: "east-coast-residence-sby",
            locationCity: "Surabaya",
            address: "Pakuwon City, Kejawan Putih Tambak, Mulyorejo",
            description: "Hunian resor di area residensial elite Pakuwon City dengan pemandangan arah Jembatan Suramadu. Fasilitas lengkap dikelilingi sekolah & universitas internasional.",
            facilities: JSON.stringify(["Resort Pool", "East Coast Center Mall", "Food Festival", "Thematic Garden", "Gymnasium", "24hr Security", "Shuttle Service"]),
            contactWa: "6282233445566",
            coverImageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            rooms: [
                { typeName: "Studio Ocean View", pricePerMonth: 2800000, roomSize: "22 m²", description: "Studio dengan pemandangan lepas ke arah laut selat Madura.", imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80" },
                { typeName: "2 Bedroom Corner", pricePerMonth: 4500000, roomSize: "46 m²", description: "Cocok untuk liburan keluarga di area premium Surabaya Timur.", imageUrl: "https://images.unsplash.com/photo-1628592102751-ba83b0314276?w=800&q=80" },
            ],
        },
        {
            name: "LRT City Sentul",
            slug: "lrt-city-sentul",
            locationCity: "Bogor",
            address: "Jl. MH. Thamrin Kav. 8, Sentul City, Babakan Madang",
            description: "Apartemen masa depan berkonsep Transit Oriented Development (TOD) yang terintegrasi langsung dengan stasiun LRT Sentul. Udara bersih, asri, dengan pemandangan Gunung Salak.",
            facilities: JSON.stringify(["LRT Station Access", "Infinity Pool View Gunung", "Green Park", "Bicycle Track", "Commercial Area", "Smart Home System"]),
            contactWa: "6281144556677",
            coverImageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80",
            rooms: [
                { typeName: "Studio Smart Home", pricePerMonth: 3500000, roomSize: "24 m²", description: "Fully furnished dengan teknologi smart home door lock dan lighting.", imageUrl: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80" },
                { typeName: "1 Bedroom Nature", pricePerMonth: 5000000, roomSize: "36 m²", description: "Kamar lega dengan balkon besar menghadap Gunung Salak.", imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80" },
            ],
        },
        {
            name: "Apartemen The Jarrdin",
            slug: "the-jarrdin-cihampelas",
            locationCity: "Bandung",
            address: "Jl. Cihampelas Belakang No.10, Cipaganti, Coblong",
            description: "Lokasi persis di belakang Ciwalk (Cihampelas Walk). Sangat strategis di pusat kota Bandung untuk turis maupun mahasiswa. Dekat dengan ITB dan area belanja Cihampelas.",
            facilities: JSON.stringify(["Kolam Renang Tematik", "Akses Jalan Kaki ke Ciwalk", "Kantin Murah", "Laundry Kiloan", "Area Parkir Basement", "Keamanan 24 Jam"]),
            contactWa: "6285299887766",
            coverImageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
            rooms: [
                { typeName: "Studio Budget", pricePerMonth: 2500000, roomSize: "18 m²", description: "Pilihan paling pas untuk backpaker atau mahasiswa dengan budget terbatas.", imageUrl: "https://images.unsplash.com/photo-1522771731478-4416cd6f52ad?w=800&q=80" },
                { typeName: "2 Bedroom Family", pricePerMonth: 4500000, roomSize: "36 m²", description: "Bisa memuat 4 orang, cocok untuk rombongan liburan akhir pekan ke Bandung.", imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80" },
            ],
        },
        {
            name: "Benson Tower - Pakuwon",
            slug: "benson-tower-pakuwon",
            locationCity: "Surabaya",
            address: "Pakuwon Mall Superblock, Surabaya Barat",
            description: "Tower apartemen elite terbaru yang berada persis di atas extention Pakuwon Mall. Mengusung tema kemewahan super premium untuk ekspatriat dan businessman.",
            facilities: JSON.stringify(["Private Lobby", "Direct Mall Access", "Sky Gym & Yoga", "Lounge", "Infinity Pool City View", "Concierge Service", "Smart Card Access"]),
            contactWa: "6281355556666",
            coverImageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
            rooms: [
                { typeName: "1 Bedroom Suite", pricePerMonth: 7500000, roomSize: "42 m²", description: "Desain interior sekelas hotel bintang 5.", imageUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80" },
                { typeName: "3 Bedroom Penthouse", pricePerMonth: 22000000, roomSize: "115 m²", description: "Lengkap dengan private elevator access dan balkon 270 derajat.", imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" },
            ],
        },
        {
            name: "The Suites Metro",
            slug: "the-suites-metro",
            locationCity: "Bandung",
            address: "Jl. Soekarno Hatta No.689, Jatisari, Buahbatu",
            description: "Berada di jalan utama bypass kota Bandung. Sangat dekat dengan Pintu Tol Buah Batu, perkantoran, dan kawasan industri terpadu. Cocok untuk pekerja dan transit business.",
            facilities: JSON.stringify(["Kolam Renang Reguler", "Mini Market Inhouse", "ATM Center", "Area Komersil", "CCTV & Security", "Laundry Koin"]),
            contactWa: "6281234123412",
            coverImageUrl: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80",
            rooms: [
                { typeName: "Studio Transit", pricePerMonth: 2000000, roomSize: "20 m²", description: "Kasur queen size, TV, AC. Sangat nyaman untuk transit.", imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80" },
                { typeName: "2 Bedroom Corner", pricePerMonth: 3200000, roomSize: "36 m²", description: "Furnished sederhana, ventilasi bagus, terang di siang hari.", imageUrl: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=800&q=80" },
            ],
        },
        {
            name: "Apartemen Bassura City",
            slug: "apartemen-bassura-city",
            locationCity: "Jakarta Timur",
            address: "Jl. Jend. Basuki Rachmat No.1A, Cipinang",
            description: "Superblock terpadu di Jakarta Timur. Sangat dekat dengan akses Tol Dalam Kota & Tol JORR, Kasablanka, Kuningan dan Sudirman. Menjadi favorit kaum milenial ibu kota karena lokasinya.",
            facilities: JSON.stringify(["Mall@Bassura", "Swimming Pool", "Kids Pool", "Children Playground", "Jogging Track", "Fitness Center", "BBQ Area", "Daycare"]),
            contactWa: "6281122338899",
            coverImageUrl: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80",
            rooms: [
                { typeName: "Studio Full Furnished", pricePerMonth: 3000000, roomSize: "21 m²", description: "Interior rapi dan estetik, lengkap dengan smart TV.", imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80" },
                { typeName: "2 Bedroom Classic", pricePerMonth: 4500000, roomSize: "34 m²", description: "Kamar nyaman dan tenang, menghadap inner court pool.", imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80" },
            ],
        },
        {
            name: "Grand Kamala Lagoon",
            slug: "grand-kamala-lagoon",
            locationCity: "Bekasi",
            address: "Jl. KH. Noer Ali No.3A, Pekayon Jaya, Bekasi Selatan",
            description: "Kawasan hunian premium berkonsep danau dan penghijauan di pusat Kota Bekasi. Terintegrasi dengan Lagoon Avenue Mall. Cocok buat yang mencari udara dan lingkungan asri di tengah kota industri.",
            facilities: JSON.stringify(["Lagoon Avenue Mall", "Pocket Garden", "Sky Dining", "Infinity Pool", "Lotus Lake Area", "Jogging Track on Water", "Fitness Center"]),
            contactWa: "6281352525252",
            coverImageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
            rooms: [
                { typeName: "Studio Emerald", pricePerMonth: 3500000, roomSize: "24 m²", description: "Studio premium dengan view langsung ke atas Lagoon.", imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80" },
                { typeName: "1 Bedroom Suite", pricePerMonth: 5000000, roomSize: "38 m²", description: "Ruang tamu lega dengan sekat modern dari kamar tidur.", imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" },
            ],
        },
        {
            name: "Grand Setiabudi Hotel & Apartment",
            slug: "grand-setiabudi",
            locationCity: "Bandung",
            address: "Jl. Dr. Setiabudi No.130-134, Hegarmanah",
            description: "Hunian berkonsep resor di kawasan elit Setiabudi, jalan utama menuju wisata Lembang. Dikelilingi factory outlet, cafe bergaya Eropa, dan kampus UPI/Enhaii.",
            facilities: JSON.stringify(["Heated Pool", "Fitness Center", "Mini Golf", "Supermarket Borma", "Cafe & Resto", "Security 24/7", "Function Room"]),
            contactWa: "6281299990000",
            coverImageUrl: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80",
            rooms: [
                { typeName: "1 Bedroom Executive", pricePerMonth: 4800000, roomSize: "40 m²", description: "Kamar luas bernuansa kayu klasik.", imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
                { typeName: "2 Bedroom Corner Mountain", pricePerMonth: 8000000, roomSize: "65 m²", description: "Sangat lega dengan view luar biasa kawasan lembang utara.", imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80" },
            ],
        },
    ];

    for (const apt of apartments) {
        const { rooms, ...aptData } = apt;
        const created = await prisma.apartment.upsert({
            where: { slug: aptData.slug },
            update: aptData,
            create: aptData,
        });

        for (const room of rooms) {
            await prisma.room.create({
                data: {
                    ...room,
                    apartmentId: created.id,
                },
            });
        }
    }

    console.log(`✅ Seed data (${apartments.length} apartments) created successfully!`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
