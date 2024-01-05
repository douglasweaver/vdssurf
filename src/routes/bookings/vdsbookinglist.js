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

// const VDSDateCell = ({ row, field }) => {

//     let date = dayjs(row[field]).toDate()
//     let formatDate = (dayjs(date).year() !== dayjs().year()) ? 'MM/DD/YY' : 'MM/DD'
//     return (
//         <Tooltip title={dayjs(date).format('ddd MMM DD YYYY @ hA')} >
//             <Box>
//                 {dayjs(date).format(formatDate)}
//             </Box>
//         </Tooltip>
//     )
// }

const VDSDateRangeCell = ({ row, field }) => {

    let checkInDate = dayjs(row.checkIn).toDate()
    let checkOutDate = dayjs(row.checkOut).toDate()
    let formatDate = (dayjs(checkOutDate).year() !== dayjs().year()) ? 'MM/DD/YY' : 'MM/DD'
    return (
        <Tooltip title={dayjs(checkInDate).format('ddd MMM DD YYYY @ hA') + ' - ' + dayjs(checkOutDate).format('ddd MMM DD YYYY @ hA')} >
            <Box>
                {dayjs(checkInDate).format('MM/DD') + '-' + dayjs(checkOutDate).format(formatDate)}
            </Box>
        </Tooltip>
    )
}

const columns = [
    {
        field: "guests", headerName: "Guests",
        flex: 6,
        textAlign: 'left',
        renderCell: VDSGuestCell,
    },
    {
        field: 'checkIn-checkOut', headerName: '\u2713-In - \u2713-Out',
        headerAlign: 'center',
        flex: 6,
        width: 200,
        textAlign: 'center',
        renderCell: VDSDateRangeCell,
    },
    {
        field: "levels", headerName: "Levels",
        headerAlign: 'center',
        flex: 4,
        width: 90,
        textAlign: 'center',
        renderCell: ({ row, field }) => {
            return <VDSLevelsIcons levels={row[field]} />
        },
    },
    {
        field: "autos", headerName: "Car",
        headerAlign: 'center',
        flex: 2,
        width: 90,
        textAlign: 'center',
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
                paddingBottom: 0,
                display: "flex",
                flexDirection: "column",
                height: '100%',
                overflow: "hidden",
                overflowY: "scroll",
            }}
        >

            <Box
                sx={{
                    paddingBottom: 0,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                {
                    columns.map((col, idx) => {
                        return (
                            <Box key={idx}
                                sx={{
                                    width: col.width,
                                    flex: col.flex,
                                    textAlign: 'center',
                                    height: '40px',
                                    lineHeight: '40px',
                                    fontWeight: 'bold',
                                    borderTop: 1,
                                    // border: "1px solid red",
                                }}
                            >
                                {col.headerName}
                            </Box>
                        )
                    })
                }
            </Box>

            <Box
                sx={{
                    paddingBottom: 1,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflow: "hidden",
                    overflowY: "scroll",
                    borderTop: 1,
                    borderLeft: 1,
                    borderRight: 1,
                }}
            >
                {
                    bookings.map((booking, idx) => {
                        return (

                            <Box
                                key={idx}
                                onClick={(event) => { rowClick(event, booking) }}
                                sx={{
                                    paddingTop: 1,
                                    paddingBottom: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                    height: '100%',
                                    borderBottom: 1,
                                    // overflow: "hidden",
                                    // overflowY: "scroll",
                                }}
                            >
                                {
                                    columns.map((col, cidx) => {
                                        return (
                                            <Box key={cidx}
                                            sx={{
                                                width: col.width,
                                                flex: col.flex,
                                                textAlign: col.textAlign,
                                                align: 'center',
                                                overflow: 'hidden',
                                            }}
                                            >
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



