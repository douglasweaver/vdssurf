import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import VDSBookingDay from './vdsbookingday';

import {
    DataGrid,
} from '@mui/x-data-grid';

import dayjs from 'dayjs';
import { fieldNameFromStoreName } from '@apollo/client/cache';
var isBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isBefore);
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
// dayjs.tz.setDefault("America/Puerto_Rico")

function createDates(bookings) {
    const dates = [];
    // find LAST booking date and add one week make sure it is a day 6 (saturday)
    // set start to 96 weeks (limitation of DATAGRID) then move to first of that month
    // dates are NOON pueto rico time

    // var startDate = dayjs(bookings[0].checkIn).tz("America/Puerto_Rico").date(1).hour(12).minute(0).second(0);
    var endDate = dayjs(bookings[bookings.length - 1].checkOut).tz("America/Puerto_Rico").add(7, 'd').day(6).hour(12).minute(0).second(0);
    var startDate = endDate.add(-94, 'week').date(1).hour(12).minute(0).second(0);
    startDate = startDate.day(0)

    for (let q = startDate; q.isSameOrBefore(endDate, 'day'); q = q.add(1, 'day')) {
        dates.push({ date: q });
    }

    bookings.forEach(bk => {
        let dateIdx = (dates.findIndex(d => d.date.isSame(bk.checkIn, 'day')))
        if (dateIdx !== -1) {
            const bkLength = dayjs(bk.checkOut).diff(bk.checkIn, 'day')

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
        let week = {
            id: dates[iSun].date.unix(),
            su: dates[iSun],
            mo: dates[iSun + 1],
            tu: dates[iSun + 2],
            we: dates[iSun + 3],
            th: dates[iSun + 4],
            fr: dates[iSun + 5],
            sa: dates[iSun + 6],
        }
        weeks.push(week);
    };
    return weeks;
};

const weekHeight = 98;

export default function VDSBookingsCalendarWeek({
    bookings,
    editBooking,
}) {

    const rows = createDates(bookings);

    const [scrollToNow, setScrollToNow] = React.useState(true);
    const todayRef = React.useRef();
    let todayRowIndex = rows.findIndex(bk => dayjs().isSameOrBefore(bk.sa.date, 'day'))
    let todayBookingId = rows[todayRowIndex === -1 ? 0 : todayRowIndex]?.id
    let hideFooter = (rows.length <= 100)
    let initialPage = Math.floor(todayRowIndex/100)
    todayRowIndex = todayRowIndex % 100
    let rowBuffer = todayRowIndex > 2 ? todayRowIndex + 1 : 4;

    React.useEffect(() => {
        console.log("entire grid mounted");
        return () => console.log("entire grid unmounted");
    }, []);


    const initialScrollToToday = (ref) => {
        if (scrollToNow) {
            ref?.current?.scrollIntoView({ behavior: "smooth", alignToTop: true });
            setScrollToNow(false)
        }
    };

    const VDSTodayCell = React.forwardRef((props, ref) => (
        <Box width='100%' height='100%' ref={ref}>
            {props.children}
        </Box>
    ))

    const VDSCell = (params) => {

        React.useEffect(() => {
            console.log("DAY mounted");                    

            if (params.field === "su" && params.row.id === todayBookingId) {
                console.log("found it----scrolling")
                initialScrollToToday(todayRef)
            }
            return () => console.log("day unmounted");
        }, []);

        if (params.field === "su" && params.row.id === todayBookingId) {
            return (
                <VDSTodayCell ref={todayRef}>
                    <VDSBookingDay
                        date={params.value.date}
                        bookings={params.value.bookings}
                        editBooking={editBooking}
                    />
                </VDSTodayCell>
            )
        } else {
            return (
                <VDSBookingDay
                    date={params.value.date}
                    bookings={params.value.bookings}
                    editBooking={editBooking}
                />
            )
        }
    }

    const columnBase = { flex: 1, align: 'center', headerAlign: 'center' }
    const columns = [
        { field: "su", headerName: "Su", ...columnBase, renderCell: VDSCell, },
        { field: "mo", headerName: "Mo", ...columnBase, renderCell: VDSCell, },
        { field: "tu", headerName: "Tu", ...columnBase, renderCell: VDSCell, },
        { field: "we", headerName: "We", ...columnBase, renderCell: VDSCell, },
        { field: "th", headerName: "Th", ...columnBase, renderCell: VDSCell, },
        { field: "fr", headerName: "Fr", ...columnBase, renderCell: VDSCell, },
        { field: "sa", headerName: "Sa", ...columnBase, renderCell: VDSCell, },
    ];

    return (

        <Box
            height='100%'
            width='100%'
        // border='3px solid purple'
        >


            <DataGrid
                columns={columns}
                rows={rows}
                rowHeight={weekHeight}
                rowBuffer={rowBuffer}   // should be at least long enough to reach today
                // disableVirtualization={true}
                hideFooter={hideFooter}
                // loading  LOADING CAUSES SCROLL TO FAIL FOR SOME REASON
                // pagination
                // initialState={{
                //     pagination: {
                //         pageSize: 100,
                //         page: {initialPage},
                //     },
                // }}

                sx={{
                    '& .MuiDataGrid-cell': {
                        padding: '0',
                    },
                }}
            />
        </Box>
    );
}




