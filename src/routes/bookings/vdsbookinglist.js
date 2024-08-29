import {useContext } from 'react';

import { BookingsContext } from './vdsBookingsContext'

import '../../App.css'

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import { vdsCommitmentColor, vdsCommitmentLabel } from './vdsbookingcommitment';
import { VDSLevelsIcons } from './vdsbookinglevels';
import { VDSAutosIcons } from './vdsbookingautos';

import { dayjsPR } from '../../components/vdsdayjspr';

const VDSGuestCell = ({ row, field }) => {
  let commitColor = (row.commitment === 'CONFIRMED' ||
    !dayjsPR().isSameOrBefore(row.checkOut, 'day'))
    ? {}
    : { backgroundColor: vdsCommitmentColor(row.commitment) }

  const toolTip = (bk) => {
    let tt = vdsCommitmentLabel(bk.commitment) + ": " + bk.guests +
      (bk.description !== "" ? " NOTE: " + bk.description : "")
    return tt
  }

  return (
    <Tooltip title={toolTip(row)} >
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

const VDSDateRangeCell = ({ row, field }) => {

  let checkInDate = dayjsPR(row.checkIn)
  let checkOutDate = dayjsPR(row.checkOut)
  let formatDate = (checkOutDate.year() !== dayjsPR().year()) ? 'MM/DD/YY' : 'MM/DD/YY'
  return (
    <Tooltip title={checkInDate.format('ddd MMM DD YYYY @ hA') + ' - ' + checkOutDate.format('ddd MMM DD YYYY @ hA')} >
      <Box>
        {checkInDate.format('MM/DD') + '-' + checkOutDate.format(formatDate)}
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
  todayFocusRef,
  editBooking,
}) {


  const contextValues = useContext(BookingsContext);
  // const { bookings, setEarliestCheckOut, bookingsLoading, error } =
  //   useContext(BookingsContext);


  const rowClick = (event, booking) => {
    editBooking(booking);
  };


  let firstFutureBooking = contextValues.bookings.find((booking) =>
      dayjsPR(booking.checkOut).isSameOrBefore(
        dayjsPR().startOf("d").add(30,"d").day(0))
    )

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
          contextValues.bookings.toReversed().map((booking, idx) => {
            const myRefProps =
              (firstFutureBooking?.id === booking.id) ?
                {
                  ref: todayFocusRef,
                  id: booking.id
                  // id: "vdsFocusDate"
                } :
                {}

            return (
              <Box
                key={idx}
                {...myRefProps}
                onClick={(event) => { rowClick(event, booking) }}
                sx={{
                  paddingTop: 1,
                  paddingBottom: 1,
                  display: "flex",
                  flexDirection: "row",
                  height: '100%',
                  borderBottom: 1,
                  background: (myRefProps.id === "paging") ? "red" : "",
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
      </Box>
    </Box>
  )

}



