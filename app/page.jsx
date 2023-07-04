'use client'
import { useEffect, useState } from 'react';
import ABlue from '../public/assets/ABlue.png'
import A from '../public/assets/A.png'
import '../styles/contacts.css'
import Link from "next/link";
import Calendar from "@/components/Calendar"
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentCard from '@/components/AppointmentCard';
import { add } from 'date-fns';
import Image from 'next/image';
import { useSession } from "next-auth/react";


const Home = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true)
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
    const [appointments, setAppointments] = useState([])
    const [currentAppointments, setCurrentAppointments] = useState([])





    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/appointments`);
            const data = await response.json();
            setAppointments(data);
            setLoading(false)

        };
        if (session?.user.id) fetchAppointments();
    }, [session?.user.id]);


    useEffect(() => {
        setCurrentAppointments(appointments.filter((appointment) => appointment.day === day && appointment.month === month))
    }
        , [appointments, value])

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
                    creator: session?.user.id,
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
            {session ?
                <div className="main">

                    <Calendar
                        value={value}
                        onAccept={() => console.log('done')}
                        onChange={(newValue) => setValue(newValue)}
                        onClick={() => setAddForm(!addForm)}
                    />

                    <div className='appointments-wrapper'>
                        <p className='bold blue_gradient'>{value.toDateString()}</p>
                        {loading ?
                            <Image width={100} height={100} src='/assets/Loader.svg' />
                            : addForm ? <AppointmentForm
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
                : <div className='get_started'>
                    <p
                    >Log in to get started</p>
                    <Image width={350} height={350} src={ABlue} />
                </div>
            }
        </section>)
}

export default Home