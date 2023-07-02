import '../styles/appointmentCard.css'

const AppointmentCard = (appointment) => {

    console.log(appointment)
    return (
        <div className='appointment-card'>
            <p className=''>{appointment.appointment.hour + ':' + appointment.appointment.min + ' ' + appointment.appointment.day + '/' + appointment.appointment.month}</p>
            <div className="appointment-wrapper">
                <p className='bold'>{appointment.appointment.title}</p>
                <p>{appointment.appointment.contact}</p>
            </div>
        </div>
    )
}

export default AppointmentCard