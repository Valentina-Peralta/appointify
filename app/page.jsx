'use client'

import '../styles/contacts.css'
import Link from "next/link";
import Calendar from "@/components/Calendar"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AddIcon from '@mui/icons-material/Add';

const Home = () => {
    return (
        <section className="home">
            <h1>Stay organized <br /> <span className="orange_gradient">Manage your contacts and <span className='blue_gradient'>appointments</span></span></h1>
            <div className="main">
                <Calendar />
                <div className="add-app-wrapper">
                    <h2 className='bold blue_gradient'>Add Appointment</h2>
                    <Box
                        className='add-form'
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 0, width: '100%', display: 'flex', direction: 'column' },
                        }}
                        noValidate

                        autoComplete="off"
                    >

                        <TextField
                            label="Appointment title"
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EditCalendarIcon />
                                    </InputAdornment>
                                ),
                            }} />
                        <TextField
                            label="Contact"
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <div className="btn_wrapper">

                            <button type='submit' className='transparent_btn'>
                                <AddIcon style={{ color: '#f35b04' }} />
                            </button>
                        </div>
                    </Box>
                </div>
            </div>
        </section>)
}

export default Home