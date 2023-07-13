import '../styles/appointmentCard.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AppointmentCard = ({ appointment, handleDelete }) => {

    console.log(appointment)
    return (
        <div className='appointment-card'>
            <div>
                <p className=''>{appointment.hour + ':' + appointment.min + ' ' + appointment.day + '/' + appointment.month}</p>
                <div className="appointment-wrapper">
                    <p className='bold'>{appointment.title}</p>
                    <p>{appointment.contact}</p>
                </div>
            </div>
            <div className='appointment_options'>



                <DeleteIcon
                    style={{ color: '#10045c' }}

                    onClick={handleDelete}
                />

            </div>
        </div>
    )
}

export default AppointmentCard