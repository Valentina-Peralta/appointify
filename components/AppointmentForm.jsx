'use client'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AddIcon from '@mui/icons-material/Add';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSession } from "next-auth/react";


const AppointmentForm = ({ createAppointment, personName, title, handleChange, onChangeTitle, onCancel, time, onChangeTime }) => {
    const [myContacts, setMyContacts] = useState([]);
    const { data: session } = useSession();

    const ITEM_HEIGHT = 50;
    const ITEM_PADDING_TOP = 5;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/contacts`);
            const data = await response.json();

            setMyContacts(data);
        };
        if (session?.user.id) fetchContacts();
    }, [session?.user.id]);







    return (


        <div className="add-app-wrapper">
            <h3 className='blue_gradient'>Add Appointment</h3>
            <Box
                onSubmit={createAppointment}
                className='add-form'
                component="form"
                sx={{
                    '& > :not(style)': { m: 0, width: '100%', display: 'flex', direction: 'column' },
                }}
                noValidate
                autoComplete="off">

                <TextField
                    label="Appointment title"
                    variant="standard"
                    value={title}
                    onChange={onChangeTitle}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EditCalendarIcon />
                            </InputAdornment>
                        ),
                    }} />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        value={time}
                        onChange={onChangeTime} />

                </LocalizationProvider >
                <InputLabel >Contacts</InputLabel>
                <Select
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {myContacts.length > 0 ? myContacts.map((contact) => (
                        <MenuItem key={contact._id} value={contact.name}>
                            <Checkbox checked={personName.indexOf(contact.name) > -1} />
                            <ListItemText primary={contact.name} />
                        </MenuItem>
                    )) : <MenuItem><ListItemText primary="You don't have any contacts yet" /></MenuItem>}
                </Select>


                <div className="btn_wrapper">

                    <button
                        onClick={onCancel} type='button' className='transparent_btn'>

                        <p className='blue_gradient'>Cancel</p>
                    </button>
                    {title === '' ? null :
                        <button type='submit'
                            className='blue_btn'>
                            <AddIcon style={{ color: '#FFF' }} />
                        </button>}
                </div>
            </Box>
        </div>)
}

export default AppointmentForm

/*                 <TextField
     label="Contact"
     variant="standard"
     value={contact}
     onChange={onChangeContact}

     InputProps={{
         startAdornment: (
             <InputAdornment position="start">
                 <PersonIcon />
             </InputAdornment>
         ),
     }}
 />
*/