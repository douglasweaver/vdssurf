import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers';
import {DatePicker} from '@mui/x-date-pickers';
// import {DateRangePicker} from '@mui/x-date-pickers';

const startLabel = 'Check-In'
const endLabel = 'Check-Out'

const DateTimePicker_sx = {
    width: '125px',
}

export default function VDSCheckInCheckOut({
    name,
    value,
    setFieldValue,
    error,
    helperText,
}) {

    const [startDate, setStartDate] = React.useState(value[0]);
    const [endDate, setEndDate] = React.useState(value[1]);

    const handleStartTimeChange = value => {

        console.log("endchange")
        console.log(value)

        setStartDate(value);
        setFieldValue(name, [value, endDate], false)
        return;
    };

    const handleEndTimeChange = value => {

        console.log("endchange")
        console.log(value)

        setEndDate(value);
        setFieldValue(name, [startDate, value], false)
        return;
    };


    const handleStartDateChange = dvalue => {

        console.log("rangechange")
        console.log(dvalue)
    
        setStartDate(dvalue);
        // setEndDate(dRange[1]);
        setFieldValue(name, dvalue, false)

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
                        startText={startLabel}
                        endText={endLabel}
                        value={startDate}
                        onChange={handleStartDateChange}
                        textField={(startProps) => (
                            <React.Fragment>
                                <TextField {...startProps} sx={DateTimePicker_sx}
                                />
                                {/* <Box sx={{ mx: 2 }}> to </Box> */}
                                {/* <TextField {...endProps} sx={DateTimePicker_sx} /> */}
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </FormGroup>

            <FormGroup
                row
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        // label={startLabel}
                        value={startDate}
                        ampm={false}
                        openTo="hours"
                        views={['hours']}
                        inputFormat='h a'
                        disableMaskedInput={true}
                        onChange={handleStartTimeChange}
                        textField={(params) => {
                            return (<TextField {...params}
                                sx={DateTimePicker_sx}
                            />
                            );
                        }}
                    />
                    {/* <Box sx={{ mx: 2 }}> to </Box> */}
                    <TimePicker
                        // label={endLabel}
                        ampm={false}
                        value={endDate}
                        openTo="hours"
                        views={['hours']}
                        inputFormat='h a'
                        disableMaskedInput={true}
                        onChange={handleEndTimeChange}
                        textField={(params) => <TextField {...params}
                            sx={DateTimePicker_sx}
                        />}
                    />

                </LocalizationProvider>

            </FormGroup>


            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>


    );
};
