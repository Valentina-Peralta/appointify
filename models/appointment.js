import { Schema, model, models } from 'mongoose';

const AppointmentSchema = new Schema({

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Title is required.'],
    },
    Contact: {
        type: String,


    }
});

const Appointment = models.Appointment || model('Appointment', AppointmentSchema);

export default Appointment;