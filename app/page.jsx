'use client'
import { useEffect, useState } from 'react';

import '../styles/contacts.css'
import Link from "next/link";
import Calendar from "@/components/Calendar"
import AppointmentForm from '@/components/AppointmentForm';

const Home = () => {
    const [value, setValue] = useState(new Date());
    const day = value.getDate()
    const month = value.getMonth()
    const year = value.getFullYear()
    const hours = value.getHours()
    const min = value.getMinutes()
    const [title, setTitle] = useState("")
    const [contact, setContact] = useState("")
    useEffect(() => console.log(day, month, year, hours, min, title, contact)
        , [contact])


    return (
        <section className="home">
            <h1>Stay organized <br /> <span className="orange_gradient">Manage your contacts and <span className='blue_gradient'>appointments</span></span></h1>
            <div className="main">
                <Calendar
                    value={value}
                    onAccept={() => console.log('done')}
                    onChange={(newValue) => setValue(newValue)}
                />
                <AppointmentForm
                    title={title}
                    contact={contact}
                    onChangeContact={(e) => setContact(e.target.value)}
                    onChangeTitle={(e) => setTitle(e.target.value)}
                />
            </div>
        </section>)
}

export default Home