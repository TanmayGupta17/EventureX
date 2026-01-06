"use client";

import { Providers } from "./providers";
import { ReactNode, useState } from "react";
import "./globals.css";
import Dialog from "../components/ui/Dialog";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PROJECT_NAME = "EventureX";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", date: "", capacity: "" });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError("");
    try {
      await axios.post("/api/events", {
        ...form,
        capacity: Number(form.capacity),
      });
      setForm({ title: "", description: "", date: "", capacity: "" });
      setOpen(false);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to create event");
    } finally {
      setCreating(false);
    }
  }

  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="w-full bg-blue-700 text-white shadow flex items-center justify-between px-8 py-4">
          <span className="text-2xl font-bold tracking-wide">{PROJECT_NAME}</span>
          <button
            className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-100 transition-colors border border-blue-700"
            onClick={() => setOpen(true)}
          >
            Create Event
          </button>
        </nav>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className="border-2 border-blue-600 rounded-lg p-6 bg-white min-w-[320px] max-w-[95vw]">
            <h3 className="text-xl font-bold mb-4 text-center text-blue-700">Create New Event</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Event Title"
                required
                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Event Description"
                required
                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[80px]"
              />
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                name="capacity"
                type="number"
                min="1"
                value={form.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                required
                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <button
                type="submit"
                className="bg-blue-700 text-white font-semibold py-2 rounded-lg hover:bg-blue-800 transition-colors"
                disabled={creating}
              >
                {creating ? "Creating..." : "Create Event"}
              </button>
            </form>
          </div>
        </Dialog>
        <main className="max-w-4xl mx-auto py-8 px-4">
          <QueryClientProvider client={new QueryClient()}>
            {children}
          </QueryClientProvider>
        </main>
      </body>
    </html>
  );
}