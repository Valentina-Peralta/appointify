import { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    number: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    email: {
        type: String,
        required: [true, 'Prompt is required.'],


    }
});

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;