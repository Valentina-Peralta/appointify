'use client'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';

export default function Calendar() {
    const [value, setValue] = useState(new Date());
    const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
    console.log(value)

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                orientation="portrait"
                openTo="day"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                slotProps={{ textField: { variant: 'outlined' } }}
                renderDay={(day, _value, DayComponentProps) => {
                    const isSelected =
                        highlightedDays.indexOf(day.getDate()) >= 0;
                    return (
                        <Badge
                            key={day.toString()}
                            overlap="circular"
                            badgeContent={isSelected ? <CheckIcon /> : undefined}
                        >
                            <PickersDay {...DayComponentProps} />
                        </Badge>
                    );
                }}
            />
        </LocalizationProvider>
    );
}
