import React from 'react';
import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';

import VDSBookingsCalendarDay from './vdsbookingscalendarday';

import dayjs from 'dayjs';
var isBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isBefore);
var minMax = require('dayjs/plugin/minMax')
dayjs.extend(minMax)
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)

function createDates(bookings) {
    const dates = [];
    var startDate = dayjs().tz("America/Puerto_Rico").startOf("d")
    if (bookings.length > 0 && dayjs(bookings[0].checkOut).tz("America/Puerto_Rico").isBefore(startDate, "d")) {
        startDate = dayjs(bookings[0].checkOut).tz("America/Puerto_Rico").startOf("d")
    }
    startDate = startDate.day(0)
    var endDate = bookings.length > 1 ? dayjs(bookings.slice(-1)[0].checkOut).tz("America/Puerto_Rico").startOf("d") : startDate
    endDate = endDate.day(6)

    for (let q = startDate; q.isSameOrBefore(endDate, 'd'); q = q.add(1, 'd')) {
        dates.push({ date: q });
    }

    bookings.forEach(bk => {
        let dateIdx = (dates.findIndex(d => d.date.isSame(dayjs(bk.checkIn).tz("America/Puerto_Rico"), 'day')))
        if (dateIdx !== -1) {
            const bkLength = dayjs(bk.checkOut).tz("America/Puerto_Rico").startOf("d").diff(dayjs(bk.checkIn).tz("America/Puerto_Rico").startOf("d"), 'day') + 1
            for (let dIdx = dateIdx; dIdx < (dateIdx + bkLength); dIdx += 1) {
                if (dates[dIdx].bookings) {
                    dates[dIdx].bookings.push(bk)
                } else {
                    dates[dIdx].bookings = [bk]
                }
            }
        }
    });

    const weeks = [];
    for (let iSun = 0; iSun < dates.length; iSun = iSun + 7) {
        let week = dates.slice(iSun, iSun + 7)
        weeks.push(week);
    };


    return weeks;
};


export default function VDSBookingCalendar({
    bookings,
    editBooking,
    loadMoreButton
}) {

    const weeks = createDates(bookings);

    const columnBase = { flex: 1, align: 'center', headerAlign: 'center' }
    const columns = [
        { field: "su", headerName: "Su", columnBase: columnBase },
        { field: "mo", headerName: "Mo", columnBase: columnBase },
        { field: "tu", headerName: "Tu", columnBase: columnBase },
        { field: "we", headerName: "We", columnBase: columnBase },
        { field: "th", headerName: "Th", columnBase: columnBase },
        { field: "fr", headerName: "Fr", columnBase: columnBase },
        { field: "sa", headerName: "Sa", columnBase: columnBase },
    ];

    return (
        <Box
            sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: '100%',
                overflow: "hidden",
                overflowY: "scroll",
                borderTop: 1,
                borderLeft: 1,
            }}
        >
            <Box
                sx={{
                    // mb: 2,
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: 1,
                    // height: '100%',
                    // overflow: "hidden",
                    // overflowY: "scroll",
                }}
            >
                {
                    columns.map((col, idx) => {
                        return (
                            <Box
                                key={idx}
                                sx={{fontWeight: 'bold',
                                    flexBasis: 0, flexGrow: 1,
                                    textAlign: 'center',margin: 'auto',
                                    borderRight : 1,
                                }}>
                                <p>{col.headerName} </p>
                            </Box>
                        )
                    })
                }

            </Box>

            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflow: "hidden",
                    overflowY: "scroll",
                }}
            >
                {
                    weeks.map((week, idx) => {
                        return (

                            <Box
                                key={idx}
                                sx={{
                                    // mb: 2,
                                    display: "flex",
                                    flexDirection: "row",
                                    height: '100%',
                                    // overflow: "hidden",
                                    // overflowY: "scroll",
                                }}
                            >
                                {
                                    week.map((day, cidx) => {
                                        return (
                                            <Box key={cidx}
                                                sx={{
                                                    flexBasis: 0, flexGrow: 1,
                                                    align: 'center',
                                                    borderRight: 1,
                                                    borderBottom: 1,
                                                }}>
                                                <VDSBookingsCalendarDay
                                                    date={day.date}
                                                    bookings={day.bookings}
                                                    editBooking={editBooking}
                                                />
                                            </Box>
                                        )
                                    })
                                }

                            </Box>
                        )
                    })
                }

                {loadMoreButton()}
            </Box>
        </Box >
    )
}



