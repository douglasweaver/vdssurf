import React from 'react';
import Tooltip from '@mui/material/Tooltip';

import { vdsCommitmentColor, vdsCommitmentLabel } from './vdsbookingcommitment';
import { VDSLevelIcon } from './vdsbookinglevels';

import { newBooking } from './vdsbookingform';

import dayjs from 'dayjs';
var isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

const conflictGray = '#abb7c2'

function VDSBookingDayLevel({
    bookings,
    onClickBooking,
    level,
    date
}) {

    let levelColor = undefined
    let bookingsForLevel = bookings?.filter((booking) => (
        (level !== undefined ? booking.levels.includes(level) : true)
    )) ?? []

    const toolTipDay = (bksForLevel) => {

        let tt = level + " VACANT"

        if (bksForLevel?.length > 0) {
            levelColor = bksForLevel?.length > 1 ? conflictGray :
                vdsCommitmentColor(bksForLevel[0].commitment)

            tt = bksForLevel?.length > 1 ? "CONFLICT: " : ""

            bksForLevel.forEach(bk => {
                tt = tt + level + " " + vdsCommitmentLabel(bk.commitment) + ": " + bk.guests +
                    (bk.description !== "" ? " NOTE: " + bk.description : "") + " "
            })
        }
        return tt
    }

    return (
        <Tooltip title={toolTipDay(bookingsForLevel)} >
            <div
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
                style={{
                    height: '24px',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: levelColor,
                    // overflowX: "auto",
                    // overflowY: "hidden",
                    ...((bookingsForLevel?.length > 0) &&
                    {
                        '&:hover': { cursor: "pointer" },
                    }),
                }}
            >

                {(bookingsForLevel?.length > 0) &&
                    <VDSLevelIcon level={level} />
                }
            </div>
        </Tooltip>

    )
}


export default function VDSBookingsCalendarDay({
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

        <div
            style={{
                mb: 0,
                display: "flex",
                flexDirection: "column",
                width: '100%',
                textAlign: 'center',
                alignItems: 'center',
                padding: '0',
                // overflowX: "auto",
                // overflowY: "hidden",
                ...(date.isToday() && { color: 'red' }),
            }}
        >

            {/* <Tooltip title={date.format('ddd MMM DD YYYY')} > */}
                <div
                    style={{
                        height: '24px',
                        width: '100%',
                        textAlign: 'right',
                        fontWeight: 'bold',
                        paddingRight: '5px',
                        // overflowX: "auto",
                        // overflowY: "hidden",                        
                        // ...(date.date() === 1 && { backgroundColor: '#1AC1DD', }),
                    }}
                >
                    {date.format((date.date() === 1 ? "MMM D" : "D"))}
                </div>
            {/* </Tooltip> */}

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

            {/* {movingOffScreenButton} */}
        </div >
    )
}

