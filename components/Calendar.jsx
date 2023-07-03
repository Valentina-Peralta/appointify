'use client'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import AddIcon from '@mui/icons-material/Add';


export default function Calendar({ value, onClick, onChange }) {


    return (
        <div className='calendar_wrapper'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateCalendar
                    value={value}
                    onChange={onChange}

                />

                {/*   <StaticDateTimePicker orientation="portrait"
                onChange={onChange}
                value={value}
                onAccept={onAccept}
            />
 */}
            </LocalizationProvider>
            <button type='button'
                onClick={onClick}
                className='blue_btn '>
                <AddIcon style={{ color: '#FFF' }} />
            </button>
        </div>
    );
}
