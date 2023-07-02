'use client'
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
import ContactCard from '@/components/ContactCard';


function page() {
    const { data: session } = useSession();
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [number, setNumber] = useState()
    const [userId, setUserId] = useState()
    const [myContacts, setMyContacts] = useState([]);

    /*     const handleEdit = (post) => {
            router.push(`/update-prompt?id=${post._id}`);
        };
     */
    const handleDelete = async (contact) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this contact?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/users/${contact._id.toString()}/contacts`, {
                    method: "DELETE",
                });

                const filteredContacts = myContacts.filter((item) => item._id !== contact._id);

                setMyContacts(filteredContacts);
            } catch (error) {
                console.log(error);
            }
        }
    };


    const fetchContacts = async () => {
        const response = await fetch(`/api/users/${userId}/contacts`);
        const data = await response.json();

        setMyContacts(data);
    };

    useEffect(() => {

        if (userId) fetchContacts();
    }, [userId]);
    console.log(myContacts)


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
                fetchContacts()
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="home">
            <h1>Stay organized <br /> <span className="">Manage your contacts and <span className=''>appointments</span></span></h1>

            <div className="contacts_main">
                <div className="contacts-wrapper">
                    {myContacts.map((contact) => (
                        <ContactCard
                            key={contact._id}
                            contact={contact}
                            handleEdit={() => console.log('edit')}
                            handleDelete={() => handleDelete && handleDelete(contact)}
                        />
                    ))}
                </div>
                <div className="add-wrapper">
                    <h2 className='blue_gradient'>Contacts</h2>

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
                            onChange={(e) => {
                                setName(e.target.value)
                            }}

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
                                <PersonAddAlt1Icon style={{ color: '#10045c' }} />
                            </button>
                        </div>
                    </Box>
                </div>


            </div>

        </div>)
}

export default page

