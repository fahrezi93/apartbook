Project Title: Apartment Directory & Lead Generation Web App (MVP)
Objective: Build a web-based catalog for apartments where users can search, view details, and contact the property manager directly via a pre-filled WhatsApp message. There is NO in-app payment and NO real-time availability tracking based on dates.

1. Tech Stack Requirements

Framework: Next.js (App Router)

Styling: Tailwind CSS + shadcn/ui (for fast UI components)

Database: PostgreSQL (Supabase)

ORM: Prisma

Authentication: NextAuth / Auth.js (STRICTLY FOR ADMIN ONLY. Public users do not log in).

State Management: React Hooks (useState, useSearchParams for filtering).

2. Database Schema (Prisma Format Logic)
Provide the Prisma schema for these core entities:

Admin: id, username, password_hash.

Apartment: id, name, slug, location_city, address, description, facilities (array of strings or JSON), contact_wa (string, e.g., "62812..."), cover_image_url, created_at, updated_at.

Room: id, apartment_id (Foreign Key), type_name (e.g., Studio, 2BR), price_per_month (integer), room_size (string), description, image_url.

Constraint: One Apartment has Many Rooms.

3. Core Features & Scope (MVP)

A. Public Facing (User App)

Homepage:

Hero section with a global Search Bar.

Search functionality uses URL query parameters (?location=X&q=Y).

Grid displaying "Featured Apartments".

Search Results Page (/search):

Reads useSearchParams.

Filters: Location (Dropdown), Name (Text input), Max Price (Slider/Input).

Displays Apartment Cards (Image, Name, Location, Starting Price).

Apartment Detail Page (/apartment/[slug]):

Displays Apartment details, images, and building facilities.

Displays a list of available Rooms inside this apartment.

Action: Each Room has a "Booking via WhatsApp" button.

WhatsApp Logic: Generates a dynamic URL https://wa.me/{contact_wa}?text=Halo,%20saya%20tertarik%20dengan%20apartemen%20{apartment_name}%20tipe%20kamar%20{room_type_name}.%20Apakah%20masih%20tersedia?

B. Admin Dashboard (/admin)

Auth: Login page. Protected routes using middleware.

Apartment Management (CRUD):

Table listing all apartments.

Form to Add/Edit Apartment (Name, Address, WA Number, Upload Image).

Room Management (CRUD):

Nested inside or linked to specific apartments.

Form to Add/Edit Rooms (Type, Price, Image).

4. Development Steps for AI Agent
Please execute the development in the following order:

Initialize Next.js project with Tailwind and shadcn/ui.

Setup Prisma schema and generate client.

Create the public layout and UI components (Navbar, Footer, Apartment Card).

Implement the Homepage and Search functional logic (Server Actions / API Routes for fetching data).

Implement the Apartment Detail Page and the dynamic WhatsApp URL generator.

Setup Admin Auth and basic CRUD interfaces.

Rule: Focus on clean, modular code. Do not implement features outside of this MVP scope. Prioritize responsive design for mobile users.