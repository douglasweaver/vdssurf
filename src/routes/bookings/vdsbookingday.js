import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import { vdsCommitmentColor, vdsCommitmentLabel } from './vdsbookingcommitment';
import { VDSLevelIcon } from './vdsbookinglevels';
import { blue } from '@mui/material/colors';


import dayjs from 'dayjs';
var isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)


const VDSGuestCell = ({ row, field }) => {
    let commitColor = (row.commitment === 'CONFIRMED' ||
        !dayjs().isSameOrBefore(row.checkOut, 'day'))
        ? {}
        : { backgroundColor: vdsCommitmentColor(row.commitment) }
    let tt = vdsCommitmentLabel(row.commitment) + ": " + row.guests +
        (row.description !== "" ? " NOTE: " + row.description : "")

    return (
        <Tooltip title={tt} >
            <Box ml='15px'
                sx={{
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    ...commitColor,
                }}
            >
                {row[field]}
            </Box>
        </Tooltip>
    )
}




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

        let tt = level +
            (bookingsForLevel?.length > 0 ?
                " " + vdsCommitmentLabel(bookingsForLevel[0].commitment) + ": " + bookingsForLevel[0].guests +
                (bookingsForLevel[0].description !== "" ? " NOTE: " + bookingsForLevel[0].description : "")
                :
                " VACANT")

        return (
            <Tooltip title={tt} >

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
            </Tooltip>

        )
    } else {
        let tt = level + " VACANT"
        return (
            <Tooltip title={tt} >

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
            </Tooltip>

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
                ...(date.isToday() && { border: "2px solid red" }),
                ...((date.month() % 2 === 0) && { bgcolor: blue[50] }),
            }}
        >

            <Tooltip title={date.format('ddd MMM DD YYYY')} >
                <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        fontWeight: 'bold',
                        ...(date.date() === 1 && { backgroundColor: '#1AC1DD', }),
                    }}
                >
                    {date.format((date.date() === 1 ? "MMM YY" : "D"))}
                </Box>
            </Tooltip>
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

