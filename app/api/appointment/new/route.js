import Appointment from "@/models/appointment";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { creator, title, contact, day, month, year, hour, min } = await request.json();

    try {
        await connectToDB();
        const newAppointment = new Appointment({ creator, title, contact, day, month, year, hour, min });

        await newAppointment.save();
        return new Response(JSON.stringify(newAppointment), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new appointment", { status: 500 });
    }
}