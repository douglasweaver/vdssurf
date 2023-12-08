import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const startLabel = 'Check-In'
const endLabel = 'Check-Out'

const DateTimePicker_sx = {
    width: '125px',
}

const TimePicker_minTime = dayjs().set('hour', 1).set('minute', 0).set('second', 0)

const TimePicker_timeSteps = { minutes: 60, }


export default function VDSCheckInCheckOut({
    name,
    value,
    setFieldValue,
    error,
    helperText,
}) {

    const [checkIn, setCheckIn] = React.useState(value[0]);
    const [checkOut, setCheckOut] = React.useState(value[1]);

    const handleStartTimeChange = value => {

        setCheckIn(value);
        setFieldValue(name, [value, checkOut], false);
        return;
    };

    const handleEndTimeChange = value => {

        setCheckOut(value);
        setFieldValue(name, [checkIn, value], false);
        return;
    };


    const handleStartDateChange = (value, context) => {

        if (context.validationError == null) {
            setCheckIn(value);
            var cOut = (checkOut.isBefore(value, 'date')) ? value.add(1, 'day') : checkOut;
            setCheckOut(cOut);
            setFieldValue(name, [value, cOut], false);
        }
        return;
    };

    const handleEndDateChange = (value, context) => {

        if (context.validationError == null) {
            setCheckOut(value);
            setFieldValue(name, [checkIn, value], false);
        }
        return;
    };

    return (
        <FormControl
            sx={{
                display: "flex",
                border: "1px solid blue",
                pt: 2,
                pb: 1,
                px: 1,
                justifyContent: "space-between",
                alignItems: "center",
                boxSizing: 'border-box',
            }}
            component="fieldset"
            variant="standard"
        >

            <FormGroup
                row
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DatePicker
                        label={startLabel}
                        value={checkIn}
                        onChange={handleStartDateChange}
                        fixedWeekNumber={5}
                        showDaysOutsideCurrentMonth={true}
                    />

                    <DatePicker
                        label={endLabel}
                        value={checkOut}
                        onChange={handleEndDateChange}
                        fixedWeekNumber={5}
                        showDaysOutsideCurrentMonth={true}
                        minDate={checkIn}

                    />
                </LocalizationProvider>
            </FormGroup>

            <FormGroup
                row
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <TimePicker

                        // label={startLabel}
                        value={checkIn}
                        ampm={false}
                        openTo="hours"
                        views={['hours', 'minutes']}
                        inputFormat='h a'
                        onChange={handleStartTimeChange}
                        // minTime={TimePicker_minTime}
                        timeSteps={TimePicker_timeSteps}
                    // sx={DateTimePicker_sx}
                    />
                    {/* <Box sx={{ mx: 2 }}> to </Box> */}
                    <TimePicker
                        // label={endLabel}
                        ampm={false}
                        value={checkOut}
                        openTo="hours"
                        views={['hours', 'minutes']}
                        inputFormat='h a'
                        onChange={handleEndTimeChange}
                        // minTime={TimePicker_minTime}
                        timeSteps={TimePicker_timeSteps}
                    // textField={(params) => <TextField {...params}
                    // sx={DateTimePicker_sx}
                    // />}
                    />

                </LocalizationProvider>

            </FormGroup>


            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>


    );
};
