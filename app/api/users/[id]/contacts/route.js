import Contact from "@/models/contact";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const contacts = await Contact.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(contacts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch contacts created by user", { status: 500 })
    }
}


export const PATCH = async (request, { params }) => {
    const { name, email, number } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingContact = await Contact.findById(params.id);

        if (!existingContact) {
            return new Response("Contact not found", { status: 404 });
        }

        // Update the prompt with new data
        existingContact.name = name;
        existingContact.email = email;
        existingContact.number = number;

        await existingContact.save();

        return new Response("Successfully updated the Contacts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Contact", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Contact.findByIdAndRemove(params.id);

        return new Response("Contact deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting contact", { status: 500 });
    }
};