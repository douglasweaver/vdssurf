import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';

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
        setStartDate(value);
        setFieldValue(name, [value, endDate], false)
        return;
    };

    const handleEndTimeChange = value => {
        setEndDate(value);
        setFieldValue(name, [startDate, value], false)
        return;
    };


    const handleDateRangeChange = dRange => {

        setStartDate(dRange[0]);
        setEndDate(dRange[1]);
        setFieldValue(name, dRange, false)

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
                <LocalizationProvider dateAdapter={DateAdapter}>

                    <MobileDateRangePicker
                        startText={startLabel}
                        endText={endLabel}
                        value={[startDate, endDate]}
                        onChange={handleDateRangeChange}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} sx={DateTimePicker_sx}
                                />
                                {/* <Box sx={{ mx: 2 }}> to </Box> */}
                                <TextField {...endProps} sx={DateTimePicker_sx} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </FormGroup>

            <FormGroup
                row
            >
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <MobileTimePicker
                        // label={startLabel}
                        value={startDate}
                        ampm={false}
                        openTo="hours"
                        views={['hours']}
                        inputFormat='h a'
                        disableMaskedInput={true}
                        onChange={handleStartTimeChange}
                        renderInput={(params) => {
                            return (<TextField {...params}
                                sx={DateTimePicker_sx}
                            />
                            );
                        }}
                    />
                    {/* <Box sx={{ mx: 2 }}> to </Box> */}
                    <MobileTimePicker
                        // label={endLabel}
                        ampm={false}
                        value={endDate}
                        openTo="hours"
                        views={['hours']}
                        inputFormat='h a'
                        disableMaskedInput={true}
                        onChange={handleEndTimeChange}
                        renderInput={(params) => <TextField {...params}
                            sx={DateTimePicker_sx}
                        />}
                    />

                </LocalizationProvider>

            </FormGroup>


            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>


    );
};
