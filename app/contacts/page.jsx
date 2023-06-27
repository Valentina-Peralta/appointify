'use client'
import Link from 'next/link'
import '../../styles/contacts.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";


function page() {
    const { data: session } = useSession();
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [number, setNumber] = useState()
    const [userId, setUserId] = useState()


    useEffect(() => {
        setUserId(localStorage.getItem('userId'))
    }, [])

    console.log(userId)

    const addContact = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/contact/new", {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    name: name,
                    number: number,
                    email: email,
                }),
            });
            if (response.ok) {
                console.log(`added`)
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="home">
            <h1>Stay organized <br /> <span className="orange_gradient">Manage your <span className='blue_gradient'>contacts</span> and appointments</span></h1>

            <div className="contacts-wrapper">

            </div>
            <div className="add-wrapper">
                <h2 className='orange_gradient bold'>Add contact</h2>
                <Box
                    onSubmit={addContact}
                    className='add-form'
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 0, width: '100%', display: 'flex', direction: 'column' },
                    }}
                    noValidate

                    autoComplete="off"
                >
                    <TextField
                        label="Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Number"
                        variant="standard"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneAndroidIcon />
                                </InputAdornment>
                            ),
                        }} />
                    <TextField
                        label="Email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <div className="btn_wrapper">

                        <button type='submit' className='transparent_btn'>
                            <PersonAddAlt1Icon style={{ color: '#f35b04' }} />
                        </button>
                    </div>
                </Box>
            </div>
        </div>)
}

export default page

/*  <form
                  className="add-form">
                  <label htmlFor="name">
                      <input type="text" placeholder='Name' />
                  </label>
                  <label htmlFor="phone">
                      <input type="text" placeholder='Phone number' />
                  </label>
                  <label htmlFor="email">
                      <input type="text" placeholder='Email' />
                  </label>
                  <div className="btn_wrapper">
                      <Link href='/'>
                          <button type='button' className='outline_btn'>
                              Cancel
                          </button>
                      </Link>
                      <button type='submit' className='orange_btn'>Add Contact</button>
                  </div>
              </form> */
