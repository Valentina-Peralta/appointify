import '../styles/appointmentCard.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AppointmentCard = (appointment, handleDelete, handleEdit) => {

    console.log(appointment)
    return (
        <div className='appointment-card'>
            <div>
                <p className=''>{appointment.appointment.hour + ':' + appointment.appointment.min + ' ' + appointment.appointment.day + '/' + appointment.appointment.month}</p>
                <div className="appointment-wrapper">
                    <p className='bold'>{appointment.appointment.title}</p>
                    <p>{appointment.appointment.contact}</p>
                </div>
            </div>
            <div className='appointment_options'>

                <EditIcon
                    style={{ color: '#10045c' }}
                    onClick={handleEdit}
                />


                <DeleteIcon
                    style={{ color: '#10045c' }}

                    onClick={handleDelete}
                />

            </div>
        </div>
    )
}

export default AppointmentCard