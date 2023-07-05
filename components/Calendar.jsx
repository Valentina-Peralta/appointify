'use client'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers';
import ABlue from '../public/assets/ABlue.png'
import Image from 'next/image';

//fetch the appointments and get the days of the current month, then
//push the numbers into the daysToHighlight array 
//define serverDay at tha main page and pass it through props 

function ServerDay(props) {
    const { day, outsideCurrentMonth, highlightedDays, ...other } = props;

    const isSelected =
        !outsideCurrentMonth && highlightedDays.includes(day.getDate());
    console.log(day, outsideCurrentMonth)

    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? <Image width={15} height={15} src={ABlue} alt='logo' /> : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}


export default function Calendar({ value, onClick, onChange, highlightedDays, onMonthChange }) {
    return (
        <div className='calendar_wrapper'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar
                    value={value}
                    onChange={onChange}
                    onMonthChange={onMonthChange}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                        },
                    }}

                />

            </LocalizationProvider>
            <button type='button'
                onClick={onClick}
                className='blue_btn '>
                <AddIcon style={{ color: '#FFF' }} />
            </button>
        </div>
    );
}
