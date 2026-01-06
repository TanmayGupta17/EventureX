import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const events = await prisma.event.findMany({
        include: { attendees: true },
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(events);
}

export async function POST(req: Request) {
    const body = await req.json();

    const event = await prisma.event.create({
        data: {
            title: body.title,
            description: body.description,
            date: new Date(body.date),
            capacity: body.capacity,
        },
    });

    return NextResponse.json(event);
}
