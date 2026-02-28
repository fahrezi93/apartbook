import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { headers } from "next/headers";
import {
    Building2,
    Home,
    LogOut,
    LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check if current page is the login page — skip sidebar for login
    const headersList = await headers();
    const pathname = headersList.get("x-nexturl-pathname") || "";
    const referer = headersList.get("referer") || "";
    const isLoginPage =
        pathname.includes("/admin/login") ||
        referer.includes("/admin/login");

    // For the login page, just render children without the dashboard layout
    let session = null;
    try {
        session = await auth();
    } catch {
        // Auth might fail if there's no database — that's okay for login page
    }

    if (!session) {
        // If no session, just render children (login page handles its own layout)
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex bg-muted/30">
            {/* Sidebar */}
            <aside className="hidden md:flex w-64 flex-col bg-background border-r">
                <div className="p-6 border-b">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="font-bold text-lg">ApartBook</span>
                            <p className="text-xs text-muted-foreground">Admin Panel</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link href="/admin">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-sm"
                        >
                            <LayoutDashboard className="h-4 w-4 mr-3" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/admin/apartments">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-sm"
                        >
                            <Building2 className="h-4 w-4 mr-3" />
                            Apartemen
                        </Button>
                    </Link>
                    <Link href="/" target="_blank">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-sm"
                        >
                            <Home className="h-4 w-4 mr-3" />
                            Lihat Website
                        </Button>
                    </Link>
                </nav>

                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 mb-3 px-2">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                            {session.user?.name?.[0]?.toUpperCase() || "A"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {session.user?.name}
                            </p>
                            <p className="text-xs text-muted-foreground">Admin</p>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/admin/login" });
                        }}
                    >
                        <Button
                            type="submit"
                            variant="ghost"
                            className="w-full justify-start text-sm text-muted-foreground hover:text-red-600"
                        >
                            <LogOut className="h-4 w-4 mr-3" />
                            Logout
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 border-b bg-background">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                            <Building2 className="h-4 w-4" />
                        </div>
                        <span className="font-bold">ApartBook</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link href="/admin/apartments">
                            <Button variant="ghost" size="sm">
                                <Building2 className="h-4 w-4" />
                            </Button>
                        </Link>
                        <form
                            action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/admin/login" });
                            }}
                        >
                            <Button variant="ghost" size="sm">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-8">{children}</main>
            </div>
        </div>
    );
}
