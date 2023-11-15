import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
// import { styled } from '@mui/material/styles';
import {
    DataGrid,
} from '@mui/x-data-grid';

import { vdsCommitmentColor, vdsCommitmentLabel } from './vdsbookingcommitment';
import { VDSLevelsIcons } from './vdsbookinglevels';
import { VDSAutosIcons } from './vdsbookingautos';

import useOnScreen from '../useOnScreen'

import dayjs from 'dayjs';
import { Grid } from '@mui/material';
// var isBefore = require('dayjs/plugin/isSameOrBefore');
// dayjs.extend(isBefore);
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
// dayjs.tz.setDefault("America/Puerto_Rico")

// const Item = styled(Box)(({ theme }) => ({
//     ...theme.typography.body2,
//     textAlign: 'center',
//     justifyContent: 'center',
//     color: theme.palette.text.secondary,
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
// }));

export default function VDSBookingsList({
    bookings,
    editBooking,
}) {

    console.log("bookings liust")

    const rows = bookings;

    const [scrollToNow, setScrollToNow] = React.useState(true);
    const todayRef = React.useRef();
    let todayRowIndex = rows.findIndex(bk => dayjs().isSameOrBefore(bk.checkOut, 'day'))
    // let rowBuffer = todayRowIndex > 2 ? todayRowIndex + 1 : 4;
    let todayBookingId = rows[todayRowIndex === -1 ? 0 : todayRowIndex]?.id

    let hideFooter = rows.length < 100;

    React.useEffect(() => {
        // console.log("entire grid mounted");
        // return () => console.log("entire grid unmounted");
    }, []);


    const initialScrollToToday = (ref) => {
        if (scrollToNow) {
            ref?.current?.scrollIntoView({ behavior: "smooth", alignToTop: true });
            setScrollToNow(false)
        }
    };

    const rowClick = (params, event) => {
        editBooking(params.row);
    };


    // infinite scrolling
    const [loading, setLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const bottom = useRef(null);
    const delay = 10000; // time in ms

    let bottomIsOnScreen = useOnScreen({ref: bottom, defaultValue: false, resetVariable: null});
    console.log("bottom: ",bottomIsOnScreen)

    const VDSGuestCell = ({ params }) => {
        let commitColor = (params.row.commitment === 'CONFIRMED' ||
        !dayjs().isSameOrBefore(params.row.checkOut, 'day'))
            ? {}
            : { backgroundColor: vdsCommitmentColor(params.row.commitment) }
        let tt = vdsCommitmentLabel(params.row.commitment) + ": " + params.value +
            (params.row.description !== "" ? " NOTE: " + params.row.description : "")

        return (
            <Tooltip title={tt} >
                <Box ml='15px'
                    sx={{
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        ...commitColor,
                    }}
                >
                    {params.value}
                </Box>
            </Tooltip>
        )
    }


    const VDSGuestCellRef = React.forwardRef((params, ref) => (
        <Box width='100%' height='100%' ref={ref}>
            <VDSGuestCell {...params} />
        </Box>
    ));

    const VDSGuest = (params) => {

        React.useEffect(() => {
            // console.log("guest mounted");                    

            if (params.row.id === todayBookingId) {
                // console.log("found it----scrolling")
                initialScrollToToday(todayRef)
            }
            // return () => console.log("guest unmounted");
        }, []);

        return ((params.row.id === todayBookingId) ?
            <VDSGuestCellRef params={params} ref={todayRef} />
            :
            <VDSGuestCell params={params} />
        )
    }

    const columns = [
        {
            field: "guests", headerName: "Guests", flex: 1,
            renderCell: VDSGuest,
        },
        {
            field: 'checkIn', headerName: '\u2713-In', type: 'date',
            align: 'center', headerAlign: 'center', 
            // width: 65,
            flex: 1,

            valueGetter: (params) => {
                if (!params.value) {
                  return params.value;
                }
                return dayjs(params.value).toDate();
              },
            renderCell: (params) => {
                let formatDate = (dayjs(params.value).year() !== dayjs().year()) ?  'MM/DD/YY': 'MM/DD'
                return (
                    <Tooltip title={dayjs(params.value).format('ddd MMM DD YYYY @ hA')} >
                        <Box>{dayjs(params.value).format(formatDate)}</Box>
                    </Tooltip>
                )
            },
        },
        {
            field: 'checkOut', headerName: '\u2713-Out', type: 'date',
            align: 'center', headerAlign: 'center',
            width: 65,
            // flex: 1,
            valueGetter: (params) => {
                if (!params.value) {
                  return params.value;
                }
                return dayjs(params.value).toDate();
              },
            renderCell: (params) => {
                return (
                    <Tooltip title={dayjs(params.value).format('ddd MMM DD YYYY @ hA')} >
                        <Box>{dayjs(params.value).format('MM/DD')}</Box>
                    </Tooltip>
                )
            },
        },
        {
            field: "levels", headerName: "Levels",
            align: 'center', headerAlign: 'center', width: 90,
            renderCell: (params) => {
                return <VDSLevelsIcons levels={params.value} />
            },
        },
        {
            field: "autos", headerName: "Car",
            align: 'center', headerAlign: 'center', width: 60,
            renderCell: (params) => {
                return <VDSAutosIcons autos={params.value} />
            },
        },
    ];

    return (

        <Box
            height='100%'
            width='100%'
        // border='3px solid purple'
        >


            {/* datagrid
edit booking:  double click did not work well on iphone sim so using onRowClick
disabling virtualization so that ALL bookings are rendered and 
I could get the ref to current active booking
*/}


            <DataGrid
                columns={columns}
                rows={rows}
                onRowClick={rowClick}
                // rowBuffer={rowBuffer}   // should be at least long enough to reach today
                // disableVirtualization={true}
                // pagination
                hideFooter={hideFooter}
                // loading  LOADING CAUSES SCROLL TO FAIL FOR SOME REASON
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
            {loading && (
                <div
                    className={showLoading ? "loading" : ""}
                    style={{ opacity: showLoading ? 1 : 0 }}
                >
                    Loading...
                </div>
            )}
            <div ref={bottom} />

        </Box>
    );
}


