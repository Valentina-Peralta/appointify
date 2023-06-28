import Appointment from "@/models/appointment";
import { connectToDB } from "@/utils/database";
import App from "next/app";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const appointments = await Appointment.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(appointments), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch appointments created by user", { status: 500 })
    }
}


export const PATCH = async (request, { params }) => {
    const { title, contact } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingAppointment = await Appointment.findById(params.id);

        if (!existingAppointment) {
            return new Response("Appointment not found", { status: 404 });
        }

        // Update the prompt with new data
        existingAppointment.title = title;
        existingAppointment.contact = contact;

        await existingAppointment.save();

        return new Response("Successfully updated the Appointments", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Appointment", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Appointment.findByIdAndRemove(params.id);

        return new Response("Appointment deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting appointment", { status: 500 });
    }
};