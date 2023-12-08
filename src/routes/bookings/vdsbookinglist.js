import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
// import { styled } from '@mui/material/styles';

import { vdsCommitmentColor, vdsCommitmentLabel } from './vdsbookingcommitment';
import { VDSLevelsIcons } from './vdsbookinglevels';
import { VDSAutosIcons } from './vdsbookingautos';

import dayjs from 'dayjs';
// var isBefore = require('dayjs/plugin/isSameOrBefore');
// dayjs.extend(isBefore);
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
// dayjs.tz.setDefault("America/Puerto_Rico")


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

const VDSDateCell = ({ row, field }) => {

    let date = dayjs(row[field]).toDate()
    let formatDate = (dayjs(date).year() !== dayjs().year()) ? 'MM/DD/YY' : 'MM/DD'
    return (
        <Tooltip title={dayjs(date).format('ddd MMM DD YYYY @ hA')} >
            <Box>
                {dayjs(date).format(formatDate)}
            </Box>
        </Tooltip>
    )
}


const columns = [
    {
        field: "guests", headerName: "Guests",
        sxParams: { flex: 1, align: 'center', textAlign: 'center',},
        renderCell: VDSGuestCell,
    },
    {
        field: 'checkIn', headerName: '\u2713-In', type: 'date',
        headerAlign: 'center',
        sxParams: { width: 100, align: 'center' ,textAlign: 'center',},
        // flex: 1,
        renderCell: VDSDateCell,
    },
    {
        field: 'checkOut', headerName: '\u2713-Out', type: 'date',
        headerAlign: 'center',
        sxParams: { width: 100, align: 'center' ,textAlign: 'center',},
        // flex: 1,
        renderCell: VDSDateCell,
    },
    {
        field: "levels", headerName: "Levels",
        headerAlign: 'center',
        sxParams: { width: 90, align: 'center' ,textAlign: 'center',},
        renderCell: ({ row, field }) => {
            return <VDSLevelsIcons levels={row[field]} />
        },
    },
    {
        field: "autos", headerName: "Car",
        headerAlign: 'center',
        sxParams: { width: 90, align: 'center' ,textAlign: 'center',},
        renderCell: ({ row, field }) => {
            return <VDSAutosIcons autos={row[field]} />
        },
    },
];


export default function VDSBookingList({
    bookings,
    editBooking,
    loadMoreButton
}) {


    const rowClick = (event, booking) => {
        editBooking(booking);
    };

    return (
        <Box
            sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: '100%',
                overflow: "hidden",
                overflowY: "scroll",
            }}
        >

            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                {
                    columns.map((col, idx) => {
                        return (
                            <Box sx={{fontWeight: 'bold', ...col.sxParams}} key={idx} >
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
                    bookings.map((booking, idx) => {
                        return (

                            <Box
                                key={idx}
                                onClick={(event) => { rowClick(event, booking) }}
                                sx={{
                                    mb: 2,
                                    display: "flex",
                                    flexDirection: "row",
                                    height: '100%',
                                    // overflow: "hidden",
                                    // overflowY: "scroll",
                                }}
                            >
                                {
                                    columns.map((col, cidx) => {
                                        return (
                                            <Box sx={col.sxParams} key={cidx}>
                                                {col.renderCell({ row: booking, field: col.field })}
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
        </Box>
    )

}



