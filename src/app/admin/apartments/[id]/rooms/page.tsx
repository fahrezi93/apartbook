"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    Plus,
    Pencil,
    Trash2,
    ArrowLeft,
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
import { formatPrice } from "@/lib/utils-app";

interface Room {
    id: string;
    typeName: string;
    pricePerMonth: number;
    roomSize: string;
    description: string;
    imageUrl: string;
}

interface ApartmentInfo {
    id: string;
    name: string;
}

const emptyForm = {
    typeName: "",
    pricePerMonth: "",
    roomSize: "",
    description: "",
    imageUrl: "",
};

export default function AdminRoomsPage() {
    const params = useParams();
    const apartmentId = params.id as string;

    const [apartment, setApartment] = useState<ApartmentInfo | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const [aptRes, roomsRes] = await Promise.all([
            fetch(`/api/admin/apartments/${apartmentId}`),
            fetch(`/api/admin/apartments/${apartmentId}/rooms`),
        ]);
        const aptData = await aptRes.json();
        const roomsData = await roomsRes.json();
        setApartment(aptData);
        setRooms(roomsData);
        setLoading(false);
    }, [apartmentId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const openCreate = () => {
        setEditId(null);
        setForm(emptyForm);
        setDialogOpen(true);
    };

    const openEdit = (room: Room) => {
        setEditId(room.id);
        setForm({
            typeName: room.typeName,
            pricePerMonth: String(room.pricePerMonth),
            roomSize: room.roomSize,
            description: room.description,
            imageUrl: room.imageUrl,
        });
        setDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const body = {
            typeName: form.typeName,
            pricePerMonth: Number(form.pricePerMonth),
            roomSize: form.roomSize,
            description: form.description,
            imageUrl: form.imageUrl,
            apartmentId,
        };

        if (editId) {
            await fetch(`/api/admin/rooms/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        } else {
            await fetch(`/api/admin/apartments/${apartmentId}/rooms`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        }

        setSubmitting(false);
        setDialogOpen(false);
        fetchData();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Apakah Anda yakin ingin menghapus kamar ini?")) return;
        await fetch(`/api/admin/rooms/${id}`, { method: "DELETE" });
        fetchData();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href="/admin/apartments"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Kembali ke Apartemen
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Kelola Kamar
                    </h1>
                    {apartment && (
                        <p className="text-muted-foreground mt-1">
                            Apartemen: <strong>{apartment.name}</strong>
                        </p>
                    )}
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah Kamar
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>
                                {editId ? "Edit Kamar" : "Tambah Kamar Baru"}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="typeName">Tipe Kamar</Label>
                                    <Input
                                        id="typeName"
                                        value={form.typeName}
                                        onChange={(e) =>
                                            setForm({ ...form, typeName: e.target.value })
                                        }
                                        placeholder="Studio, 1BR, 2BR"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="roomSize">Ukuran</Label>
                                    <Input
                                        id="roomSize"
                                        value={form.roomSize}
                                        onChange={(e) =>
                                            setForm({ ...form, roomSize: e.target.value })
                                        }
                                        placeholder="21 m²"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pricePerMonth">Harga per Bulan (Rp)</Label>
                                <Input
                                    id="pricePerMonth"
                                    type="number"
                                    value={form.pricePerMonth}
                                    onChange={(e) =>
                                        setForm({ ...form, pricePerMonth: e.target.value })
                                    }
                                    placeholder="4500000"
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
                                <Label htmlFor="imageUrl">URL Gambar</Label>
                                <Input
                                    id="imageUrl"
                                    value={form.imageUrl}
                                    onChange={(e) =>
                                        setForm({ ...form, imageUrl: e.target.value })
                                    }
                                    placeholder="https://..."
                                    required
                                />
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
                            <TableHead>Tipe</TableHead>
                            <TableHead>Ukuran</TableHead>
                            <TableHead>Harga/bulan</TableHead>
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
                        ) : rooms.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    Belum ada data kamar
                                </TableCell>
                            </TableRow>
                        ) : (
                            rooms.map((room) => (
                                <TableRow key={room.id}>
                                    <TableCell className="font-medium">{room.typeName}</TableCell>
                                    <TableCell>{room.roomSize}</TableCell>
                                    <TableCell>{formatPrice(room.pricePerMonth)}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => openEdit(room)}>
                                                    <Pencil className="h-4 w-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(room.id)}
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
