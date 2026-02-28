"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    Plus,
    Pencil,
    Trash2,
    DoorOpen,
    MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Apartment {
    id: string;
    name: string;
    slug: string;
    locationCity: string;
    address: string;
    description: string;
    facilities: string;
    contactWa: string;
    coverImageUrl: string;
    _count: { rooms: number };
}

const emptyForm = {
    name: "",
    locationCity: "",
    address: "",
    description: "",
    facilities: "",
    contactWa: "",
    coverImageUrl: "",
};

export default function AdminApartmentsPage() {
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    const fetchApartments = useCallback(async () => {
        setLoading(true);
        const res = await fetch("/api/admin/apartments");
        const data = await res.json();
        setApartments(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchApartments();
    }, [fetchApartments]);

    const openCreate = () => {
        setEditId(null);
        setForm(emptyForm);
        setDialogOpen(true);
    };

    const openEdit = (apt: Apartment) => {
        setEditId(apt.id);
        const facilities = (() => {
            try {
                const parsed =
                    typeof apt.facilities === "string"
                        ? JSON.parse(apt.facilities)
                        : apt.facilities;
                return Array.isArray(parsed) ? parsed.join(", ") : "";
            } catch {
                return "";
            }
        })();
        setForm({
            name: apt.name,
            locationCity: apt.locationCity,
            address: apt.address,
            description: apt.description,
            facilities,
            contactWa: apt.contactWa,
            coverImageUrl: apt.coverImageUrl,
        });
        setDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const facilitiesArray = form.facilities
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean);

        const body = {
            name: form.name,
            locationCity: form.locationCity,
            address: form.address,
            description: form.description,
            facilities: JSON.stringify(facilitiesArray),
            contactWa: form.contactWa,
            coverImageUrl: form.coverImageUrl,
        };

        if (editId) {
            await fetch(`/api/admin/apartments/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        } else {
            await fetch("/api/admin/apartments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        }

        setSubmitting(false);
        setDialogOpen(false);
        fetchApartments();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus apartemen ini?")) return;
        await fetch(`/api/admin/apartments/${id}`, { method: "DELETE" });
        fetchApartments();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Kelola Apartemen</h1>
                    <p className="text-muted-foreground mt-1">
                        Tambah, edit, atau hapus data apartemen
                    </p>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Apartemen
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {editId ? "Edit Apartemen" : "Tambah Apartemen Baru"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Apartemen</Label>
                                    <Input
                                        id="name"
                                        value={form.name}
                                        onChange={(e) =>
                                            setForm({ ...form, name: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="locationCity">Kota</Label>
                                    <Input
                                        id="locationCity"
                                        value={form.locationCity}
                                        onChange={(e) =>
                                            setForm({ ...form, locationCity: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Alamat</Label>
                                <Input
                                    id="address"
                                    value={form.address}
                                    onChange={(e) =>
                                        setForm({ ...form, address: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea
                                    id="description"
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="facilities">
                                    Fasilitas (pisahkan dengan koma)
                                </Label>
                                <Input
                                    id="facilities"
                                    value={form.facilities}
                                    onChange={(e) =>
                                        setForm({ ...form, facilities: e.target.value })
                                    }
                                    placeholder="Kolam Renang, Gym, Parkir"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contactWa">No. WhatsApp</Label>
                                    <Input
                                        id="contactWa"
                                        value={form.contactWa}
                                        onChange={(e) =>
                                            setForm({ ...form, contactWa: e.target.value })
                                        }
                                        placeholder="6281234567890"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="coverImageUrl">URL Gambar Cover</Label>
                                    <Input
                                        id="coverImageUrl"
                                        value={form.coverImageUrl}
                                        onChange={(e) =>
                                            setForm({ ...form, coverImageUrl: e.target.value })
                                        }
                                        placeholder="https://..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setDialogOpen(false)}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {submitting ? "Menyimpan..." : editId ? "Simpan" : "Tambah"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Table */}
            <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Kota</TableHead>
                            <TableHead className="text-center">Kamar</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : apartments.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    Belum ada data apartemen
                                </TableCell>
                            </TableRow>
                        ) : (
                            apartments.map((apt) => (
                                <TableRow key={apt.id}>
                                    <TableCell className="font-medium">{apt.name}</TableCell>
                                    <TableCell>{apt.locationCity}</TableCell>
                                    <TableCell className="text-center">
                                        {apt._count.rooms}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => openEdit(apt)}>
                                                    <Pencil className="h-4 w-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <Link href={`/admin/apartments/${apt.id}/rooms`}>
                                                    <DropdownMenuItem>
                                                        <DoorOpen className="h-4 w-4 mr-2" />
                                                        Kelola Kamar
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(apt.id)}
                                                    className="text-red-600 focus:text-red-600"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
