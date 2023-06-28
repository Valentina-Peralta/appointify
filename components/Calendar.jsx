'use client'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';


export default function Calendar({ value, onAccept, onChange }) {


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>

            <StaticDateTimePicker orientation="portrait"
                onChange={onChange}
                value={value}
                onAccept={onAccept}
            />

        </LocalizationProvider>
    );
}
