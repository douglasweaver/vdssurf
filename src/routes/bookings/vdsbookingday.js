import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import { vdsCommitmentColor, vdsCommitmentLabel } from './vdsbookingcommitment';
import { VDSLevelIcon } from './vdsbookinglevels';

import { newBooking } from './vdsbookingform';

import dayjs from 'dayjs';
var isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

function VDSBookingDayLevel({
    bookings,
    onClickBooking,
    level,
    date
}) {

    let tt = level + " VACANT"
    let levelColor = undefined
    let bookingsForLevel = bookings?.filter((booking) => (
        (level !== undefined ? booking.levels.includes(level) : true)
    )) ?? []

    if (bookingsForLevel?.length > 0) {
        levelColor = bookingsForLevel?.length > 1 ? '#FFA500' :
            vdsCommitmentColor(bookingsForLevel[0].commitment)

        tt = level + " " + vdsCommitmentLabel(bookingsForLevel[0].commitment) + ": " + bookingsForLevel[0].guests +
            (bookingsForLevel[0].description !== "" ? " NOTE: " + bookingsForLevel[0].description : "")
    }

    return (
        <Tooltip title={tt} >
            <Box
                onClick={() => onClickBooking(
                    (bookingsForLevel?.length > 0 ?
                        { booking: bookingsForLevel[0] } :
                        {
                            booking: newBooking({
                                levels: [level],
                                checkIn: date.tz().hour(3).minute(0).second(0).toISOString(),
                                checkOut: date.tz().hour(3).minute(0).second(0).add(7, 'day').toISOString(),
                            })
                        })
                )
                }
                sx={{
                    height: '24px',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: levelColor,
                    ...((bookingsForLevel?.length > 0) &&
                    {
                        '&:hover': { cursor: "pointer" },
                    }),
                }}
            >

                {(bookingsForLevel?.length > 0) &&
                    <VDSLevelIcon level={level} />
                }
            </Box>
        </Tooltip>

    )
}


export default function VDSBookingDay({
    date,
    bookings,
    editBooking,
}) {

    const onClickBooking = ({ booking,
        startDate,
        level
    }) => {
        if (booking) {
            editBooking(booking);
        }
    }

    return (

        <Box
            sx={{
                mb: 0,
                display: "flex",
                flexDirection: "column",
                width: '100%',
                justifyContent: 'flex-start',
                textAlign: 'center',
                alignItems: 'center',
                padding: '0',
                ...(date.isToday() && { color: 'red' }),
                // ...((date.month() % 2 === 0) && { bgcolor: blue[50] }),
            }}
        >

            <Tooltip title={date.format('ddd MMM DD YYYY')} >
                <Box
                    sx={{
                        height: '24px',
                        width: '100%',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        ...(date.date() === 1 && { backgroundColor: '#1AC1DD', }),
                    }}
                >
                    {date.format((date.date() === 1 ? "MMM YY" : "D"))}
                </Box>
            </Tooltip>

            <VDSBookingDayLevel
                bookings={bookings}
                onClickBooking={onClickBooking}
                level='STEPS'
                date={date}
            />

            <VDSBookingDayLevel
                bookings={bookings}
                onClickBooking={onClickBooking}
                level='SANDY'
                date={date}
            />

            <VDSBookingDayLevel
                bookings={bookings}
                onClickBooking={onClickBooking}
                level='TRESPALMAS'
                date={date}
            />
        </Box >
    )
}

