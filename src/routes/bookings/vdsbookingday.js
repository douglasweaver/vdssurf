import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { vdsCommitmentColor } from './vdsbookingcommitment';
import { VDSLevelIcon } from './vdsbookinglevels';

function VDSBookingDayLevel({
    bookings,
    onClickBooking,
    level,
}) {

    if (bookings.length > 0) {
        let bookingsForLevel = bookings.filter((booking) => (
            (level !== undefined ? booking.levels.includes(level) : true)
        ));

        let levelColor = bookingsForLevel?.length > 1 ? (
            '#FFA500'
        ) : (
            bookingsForLevel?.length > 0 ?
                vdsCommitmentColor(bookingsForLevel[0].commitment)
                :
                undefined
        )
        return (
            <Grid
                item
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{
                    height: '27%',
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    ...(levelColor !== undefined &&
                    {
                        '&:hover': { cursor: "pointer" },
                        backgroundColor: levelColor,
                    }),
                }}
                onClick={() => onClickBooking(bookingsForLevel)}
            >
                <VDSLevelIcon level={level} />
            </Grid>
        )
    } else {
        return (
            <Grid
                item
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{
                    height: '27%',
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                }}
            >
                <VDSLevelIcon level={level} />
            </Grid>
        )
    }
}


export default function VDSBookingDay({
    date,
    bookings,
    editBooking,
}) {

    const onClickBooking = (bookings) => {
        if (bookings?.length > 0) {
            editBooking(bookings[0]);
        }
    }

    return (

        <Grid
            container
            item
            spacing='0'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='flex-start'
            textAlign='center'
            width='100%'
            height='100%'
            padding='0'
            sx={{
                // border: "1px solid red",
            }}
        >

            <Grid
                item
                sx={{
                    height: '19%',
                    width: '100%',
                    // border: "1px solid red",
                    ...(date.date() === 1 && { backgroundColor: '#1AC1DD', }),
                }}
            >
                <Box
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    {date.format((date.date() === 1 ? "MMM YY" : "D"))}
                </Box>
            </Grid>

            {(bookings?.length > 0) &&
                <React.Fragment>
                    <VDSBookingDayLevel
                        bookings={bookings}
                        onClickBooking={onClickBooking}
                        level='STEPS'
                    />

                    <VDSBookingDayLevel
                        bookings={bookings}
                        onClickBooking={onClickBooking}
                        level='SANDY'
                    />

                    <VDSBookingDayLevel
                        bookings={bookings}
                        onClickBooking={onClickBooking}
                        level='TRESPALMAS'
                    />
                </React.Fragment>

            }

        </Grid >
    )
}

