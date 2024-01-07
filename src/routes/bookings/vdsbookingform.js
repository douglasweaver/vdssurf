import React from 'react';

import { Formik, Form } from 'formik';
import * as yup from 'yup';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import VDSCheckInCheckOut from '../../components/vdscheckincheckout';
import { VDSBookingAutos } from './vdsbookingautos'
import { VDSBookingLevels } from './vdsbookinglevels'
import { VDSBookingCommitment, commitmentDefault } from './vdsbookingcommitment'

import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

export function newBooking(inBook) 
 {
    let newBook = {
        guests: '',
        description: '',
        levels: [],
        autos: [],
        commitment: commitmentDefault,
        checkIn: dayjs().tz("America/Puerto_Rico").hour(3).minute(0).second(0).millisecond(0).toISOString(),
        checkOut: dayjs().tz("America/Puerto_Rico").hour(3).minute(0).second(0).millisecond(0).add(7, 'day').toISOString(),
        type: "Booking"
    };
    Object.assign(newBook, inBook ?? {})
    return newBook;
}

function vdsBookingToFormInitialValues(
    booking,
) {
    // strip out __typename so mutation add will work
    const bk = ('id' in booking) ? { id: booking.id } : {};
    Object.assign(bk,
        {
            guests: booking.guests || '',
            description: booking.description || '',
            levels: booking.levels || [],
            autos: booking.autos || [],
            commitment: booking.commitment || commitmentDefault,
            dateRange: [dayjs(booking.checkIn).tz("America/Puerto_Rico") || dayjs(),
            dayjs(booking.checkOut).tz("America/Puerto_Rico") || dayjs().add(7, 'day')
            ],
            type: booking.type
        });
    return bk;
}

function vdsFormValuesToBooking(
    values,
) {
    const bk = {...values};
    Object.assign(bk,
        {
            checkIn: values.dateRange[0].toISOString(),
            checkOut: values.dateRange[1].toISOString(),
        });
    delete bk.dateRange;
    return bk;
}

const validationSchema = yup.object({
    guests: yup
        .string('Enter guests')
        .min(2, "Minimum character is 2")
        .max(50, "Maximum character is 50.")
        .required("Guests is required"),
});

export function VDSBookingForm({
    booking,
    handleCreateBooking,
    handleDeleteBooking,
    handleBookingDialogClose,
}) {

    const createBookingPressed = (values) => {
        handleCreateBooking(vdsFormValuesToBooking(values));
    }

    const handleDelete = (values) => {
        handleDeleteBooking(values.id);
    }

    return (


        <Box
            sx={{
                display: "flex",
                pt: 1,
                alignItems: "left",
            }}
        >

            <Formik
                initialValues={vdsBookingToFormInitialValues(booking)}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    createBookingPressed(values);
                }}
            >
                {({ values, handleChange, setFieldValue, touched, errors }) => (

                    <Form>
                        <TextField
                            variant="outlined"
                            autoFocus
                            required
                            fullWidth
                            id="guests"
                            name="guests"
                            label="Guests"
                            value={values.guests}
                            onChange={handleChange}
                            error={touched.guests && Boolean(errors.guests)}
                            helperText={touched.guests && errors.guests}
                        />

                        <TextField
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            id="description"
                            name="description"
                            label="Notes"
                            value={values.description}
                            onChange={handleChange}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                        />

                        <VDSCheckInCheckOut
                            name="dateRange"
                            value={values.dateRange}
                            setFieldValue={setFieldValue}
                            error={touched.dateRange && Boolean(errors.dateRange)}
                            helperText={touched.dateRange && errors.dateRange}
                        />

                        <VDSBookingLevels
                            name="levels"
                            value={values.levels}
                            setFieldValue={setFieldValue}
                            error={touched.levels && Boolean(errors.levels)}
                            helperText={touched.levels && errors.levels}
                        />

                        <VDSBookingAutos
                            name="autos"
                            value={values.autos}
                            setFieldValue={setFieldValue}
                            error={touched.autos && Boolean(errors.autos)}
                            helperText={touched.autos && errors.autos}
                        />


                        <VDSBookingCommitment
                            id="commitment"
                            name="commitment"
                            value={values.commitment}
                            setFieldValue={setFieldValue}
                            error={touched.commitment && Boolean(errors.commitment)}
                            helperText={touched.commitment && errors.commitment}
                        />

                        <Box
                            component="span"
                            sx={{
                                display: "flex",
                                border: "1px solid",
                                padding: 1,
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >

                            <Button
                                type="submit"
                                variant="contained"
                                float="left"
                            >
                                Save
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleBookingDialogClose}
                                float="center"
                            >
                                Cancel
                            </Button>

                            {('id' in values) &&
                                <Button
                                    variant="contained"
                                    onClick={() => handleDelete(values)}
                                    float="right"
                                >
                                    Delete
                                </Button>
                            }
                        </Box>

                    </Form>
                )}
            </Formik>
        </Box>
    );
};

