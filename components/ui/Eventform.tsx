"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/lib/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type EventFormData = z.infer<typeof eventSchema>;

export default function EventForm() {
    const qc = useQueryClient();

    const form = useForm({
        resolver: zodResolver(eventSchema),
    });

    const mutation = useMutation({
        mutationFn: (data: EventFormData) => axios.post("/api/events", data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["events"] });
            toast.success("Event created");
            form.reset();
        },
        onError: () => toast.error("Failed to create event"),
    });

    return (
        <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))}>
            <input {...form.register("title")} placeholder="Title" />
            <textarea {...form.register("description")} />
            <input type="date" {...form.register("date")} />
            <input
                type="number"
                {...form.register("capacity", { valueAsNumber: true })}
            />
            <button>Create Event</button>
        </form>
    );
}
