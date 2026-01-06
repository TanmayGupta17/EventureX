"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Dialog from "./Dialog";

export default function EventList() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["events"],
        queryFn: () => axios.get("/api/events").then(res => res.data),
    });

    const [openId, setOpenId] = useState<string | null>(null); // event id for dialog
    const [form, setForm] = useState({ name: "", email: "" });
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [error, setError] = useState("");

    const mutation = useMutation<void, AxiosError<{ error: string }>, { name: string; email: string; eventId: string }>({
        mutationFn: (data) => axios.post("/api/attendees", data),
        onSuccess: () => {
            setRegistering(false);
            setOpenId(null);
            setConfirmOpen(true);
            setForm({ name: "", email: "" });
            setError("");
            refetch();
        },
        onError: (err: AxiosError<{ error: string }>) => {
            setRegistering(false);
            setError(err?.response?.data?.error || "Registration failed. Please try again.");
        },
    });

    function handleOpen(eventId: string) {
        setOpenId(eventId);
        setForm({ name: "", email: "" });
        setError("");
    }

    function handleClose() {
        setOpenId(null);
        setError("");
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    function handleSubmit(eventId: string, e: React.FormEvent) {
        e.preventDefault();
        setRegistering(true);
        mutation.mutate({ ...form, eventId });
    }

    if (isLoading) return <p>Loading events...</p>;
    if (isError) return <p>Error loading events</p>;
    if (!data.length) return <p>No events yet</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-8">
            {data.map((e: { id: string; title: string; attendees: []; capacity: number }) => (
                <div key={e.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{e.title}</h3>
                        <div className="text-gray-500 text-sm mb-2">{e.attendees.length} / {e.capacity} registered</div>
                    </div>
                    <button
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
                        onClick={() => handleOpen(e.id)}
                    >
                        Register
                    </button>
                    <Dialog open={openId === e.id} onClose={handleClose}>
                        <h4 className="text-xl font-bold mb-4 text-center">Register for {e.title}</h4>
                        <form onSubmit={(ev) => handleSubmit(e.id, ev)} className="flex flex-col gap-4 min-w-[260px]">
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                            <button
                                type="submit"
                                className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                disabled={registering}
                            >
                                {registering ? "Registering..." : "Register"}
                            </button>
                        </form>
                    </Dialog>
                </div>
            ))}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <div className="text-center p-6">
                    <svg className="mx-auto mb-3 text-green-500" width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22c55e" opacity="0.15" /><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <h4 className="text-xl font-bold mb-2 text-green-700">Registration Confirmed!</h4>
                    <button
                        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => setConfirmOpen(false)}
                    >
                        Back to Events
                    </button>
                </div>
            </Dialog>
        </div>
    );
}
