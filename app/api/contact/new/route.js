import Contact from "@/models/contact";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    const { userId, name, number, email } = await request.json();

    try {
        await connectToDB();
        const newContact = new Contact({ creator: userId, name, number, email });

        await newContact.save();
        return new Response(JSON.stringify(newContact), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new contact", { status: 500 });
    }
}