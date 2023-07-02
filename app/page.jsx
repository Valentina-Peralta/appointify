'use client'
import { useEffect, useState } from 'react';
import ABlue from '../public/assets/ABlue.png'
import '../styles/contacts.css'
import Link from "next/link";
import Calendar from "@/components/Calendar"
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentCard from '@/components/AppointmentCard';
import { add } from 'date-fns';
import Image from 'next/image';

const Home = () => {
    const [addForm, setAddForm] = useState(false)
    const [personName, setPersonName] = useState([]);
    const [value, setValue] = useState(new Date());
    const day = value.getDate()
    const month = value.getMonth() + 1
    const year = value.getFullYear()
    const [time, setTime] = useState(new Date())

    const hours = time.getHours().toString()
    const min = time.getMinutes().toString().padStart(2, '0');
    const [title, setTitle] = useState("")
    const [userId, setUserId] = useState('')
    const [appointments, setAppointments] = useState([])
    const [currentAppointments, setCurrentAppointments] = useState([])

    const fetchAppointments = async () => {
        const response = await fetch(`/api/users/${userId}/appointments`);
        const data = await response.json();
        setAppointments(data);
    };


    useEffect(() => {
        setUserId(localStorage.getItem('userId'))

    }, [])

    useEffect(() => {

        if (userId) fetchAppointments();
    }, [userId, addForm]);

    console.log(appointments)

    useEffect(() => {
        console.log(day, month, year, title, hours, min, personName)
        console.log(value)
        setCurrentAppointments(appointments.filter((appointment) => appointment.day === day && appointment.month === month))
        console.log(currentAppointments, addForm)
    }
        , [value])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    const createAppointment = async (e) => {


        e.preventDefault();

        try {
            const response = await fetch("/api/appointment/new", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    contact: personName[0],
                    day: day,
                    month: month,
                    year: year,
                    hour: hours,
                    min: min

                }),
            });

            if (response.ok) {
                //router.push("/");
                console.log('appointment created succesfully')
                setAddForm(false)
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <section className="home">
            <h1>Stay organized <br /> <span className="">Manage your contacts and <span className=''>appointments</span></span></h1>
            <div className="main">
                <Calendar
                    value={value}
                    onAccept={() => console.log('done')}
                    onChange={(newValue) => setValue(newValue)}
                    onClick={() => setAddForm(!addForm)}
                />
                <div className='appointments-wrapper'>
                    <p className='bold blue_gradient'>{value.toDateString()}</p>
                    {addForm ? <AppointmentForm
                        createAppointment={createAppointment}
                        title={title}
                        personName={personName}
                        handleChange={(e) => handleChange(e)}
                        onChangeTitle={(e) => setTitle(e.target.value)}
                        time={time}
                        onChangeTime={(e) => setTime(e)}
                        onCancel={() => setAddForm(false)}
                    /> : !addForm && currentAppointments.length > 0 ?
                        currentAppointments.map((appointment) => (

                            <AppointmentCard
                                key={appointment._id}
                                appointment={appointment}
                            />
                        )) : !addForm && currentAppointments.length === 0 ?
                            <div className='empty_schedule'>
                                <Image width={250} height={250} src={ABlue} />
                                <p className='bold'>You don't have any appointments on this day</p>
                            </div>
                            : null}

                </div>
            </div>


        </section>)
}

export default Home