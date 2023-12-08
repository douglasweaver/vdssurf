import React from 'react';
import Box from '@mui/material/Box';

import { vdsCommitmentColor } from './vdsbookingcommitment';
import { VDSLevelIcon } from './vdsbookinglevels';

import dayjs from 'dayjs';
var isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)


function VDSBookingDayLevel({
    bookings,
    onClickBooking,
    level,
}) {

    if (bookings?.length > 0) {
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
            <Box
                onClick={() => onClickBooking(bookingsForLevel)}
                sx={{
                    display: "flex",
                    height: '27%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    ...(levelColor !== undefined &&
                    {
                        '&:hover': { cursor: "pointer" },
                        backgroundColor: levelColor,
                    }),
                }}
            >
                <VDSLevelIcon level={level} />
            </Box>
        )
    } else {
        return (
            <Box
                sx={{
                    display: "flex",
                    height: '27%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                }}
            >
                <VDSLevelIcon level={level} />
            </Box>
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

        <Box
            sx={{
                mb: 0,
                display: "flex",
                flexDirection: "column",
                height: '100%',
                width: '100%',
                justifyContent: 'flex-start',
                textAlign: 'center',
                alignItems: 'center',
                padding: '0',
                ...(date.isToday() && { border: "2px solid red" })
            }}
        >

            <Box
                sx={{
                    height: '100%',
                    width: '100%',
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
            </Box>

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

        </Box >
    )
}

