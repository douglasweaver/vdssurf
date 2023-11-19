import React from 'react';

import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import CalendarViewMonthTwoToneIcon from '@mui/icons-material/CalendarViewMonthTwoTone';

import {
    gql,
    useQuery,
    useMutation,
} from '@apollo/client';
import {
    deleteVDSBooking,
    createVDSBooking,
    updateVDSBooking
} from '../graphql/mutations';
import {VDSBookingsByDate } from '../graphql/queries';
import {VDSBookingsByCheckIn} from '../graphql/vds_queries';

import { importCSVBookings } from './bookings/vdsbookingIMPORT';

import {
    testBookings,
    VDSBookingForm,
    newBooking,
} from './bookings/vdsbookingform';

import VDSBookingsCalendarWeek from './bookings/vdsbookingscalendarweek';
import VDSBookingsList from './bookings/vdsbookingslistvirtual';
import VDSBookingslistdev from './bookings/vdsbookingslistdev';
import VDSBookingsListInfinite from './bookings/vdsbookingslistinfinte';
import VDSErrorBoundary from '../components/vdserrorboundary';

import dayjs from 'dayjs';

export function vdsBookingsFindDate(bookings, targetDate) {
    bookings.findIndex(bk => targetDate.isSameOrBefore(bk.checkIn, 'day'))
}

export default function VDSBookings() {

    const [currentbooking, setCurrentBooking] = React.useState(newBooking());
    const [bookingDialogOpen, setBookingDialogOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState([
        dayjs().add(-60, 'day').toISOString(),
        dayjs().add(+30, 'day').toISOString()])


    const bookingsByCheckInRangeQueryVariables = {
        checkIn: {between: dateRange},
        // checkIn: {eq: "2015-03-12T04:00:00.000Z"},
        sortDirection: 'ASC',
        limit: 1000,
        type: 'Booking'
    }    
    const bookingsRet = useQuery(gql(VDSBookingsByCheckIn),
        { variables: bookingsByCheckInRangeQueryVariables });
        // const bookingsRet = useQuery(gql(vDSBookingsByDate),
        // { variables: bookingsByCheckInQueryVariables });
    console.log(bookingsRet)

    const [deleteBooking, deleteRet] =
        useMutation(gql(deleteVDSBooking),
            {
                refetchQueries: () => [{
                    query: gql(VDSBookingsByCheckIn),
                    variables: bookingsByCheckInRangeQueryVariables,
                }],
            }
        );

    const [addBooking, addRet] = useMutation(gql(createVDSBooking),
        {
            refetchQueries: () => [{
                query: gql(VDSBookingsByCheckIn),
                variables: bookingsByCheckInRangeQueryVariables,
            }]
        }
    );
    const [updateBooking, updateRet] = useMutation(gql(updateVDSBooking));

    const [viewMode, setViewMode] = React.useState('List');
    const handleViewModeChange = (event, newViewMode) => {
        setViewMode(newViewMode);
    };

    const handleCreateBooking = (booking) => {
        setBookingDialogOpen(false);
        if ('id' in booking) {
            updateBooking({ variables: { input: booking } });
        } else {
            addBooking({ variables: { input: booking } });
        }
    }

    const handleBookingDialogClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setBookingDialogOpen(false);
        }
    }

    const handleBookingDialogOpen = () => {
        setBookingDialogOpen(true);
    }

    const handleDeleteBooking = (id) => {
        deleteBooking({ variables: { input: { id: id } } });
        handleBookingDialogClose();
    }


    const deleteAllBookings = () => {

        // importCSVBookings().forEach(item => addBooking({ variables: { input: item } }));

        // console.log("Delete all bookings")
        // console.log(bookings)

        // bookings.forEach(bk => {
        //     console.log(bk.id)
        //     deleteBooking({ variables: { input: { id: bk.id } } });
        //     // addBooking({ variables: { input: bk } });
        // });

    }


    const editBooking = (booking) => {

        // testBookings().forEach(bk => {
        //     addBooking({ variables: { input: bk } });
        // });

        if (booking) {
            setCurrentBooking(booking);
            handleBookingDialogOpen();
        }
    }
    
    let bookings = (bookingsRet.data !== undefined) ? bookingsRet.data.VDSBookingsByDate.items : [];
    console.log(bookings)
    
    let msg = ""
    msg += (bookingsRet.loading ? "Bookings...loading" : "")
    msg += (bookingsRet.error ? "Bookings..." + bookingsRet.error.message : "")
    msg += (deleteRet.loading ? "Bookings...deleting" : "")
    msg += (deleteRet.error ? "Bookings..." + deleteRet.error.message : "")
    msg += (addRet.loading ? "Bookings...adding" : "")
    msg += (addRet.error ? "Bookings..." + addRet.error.message : "")
    msg += (updateRet.loading ? "Bookings...updating" : "")
    msg += (updateRet.error ? "Bookings..." + updateRet.error.message : "")

    return (
        (msg !== "") ? (
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', }}>{msg}</Typography>
            </Box>
        ) : (

            <Box
                display='flex'
                flex={1}
                overflow='hidden'
                flexDirection='column'
                width='100%'
                sx={{
                    // border: "1px solid red",
                }}
            >

                <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    width='100%'
                    sx={{
                        // border: "1px solid green",
                    }}
                >
                    <Box>
                        <ToggleButtonGroup
                            color="standard"
                            orientation="horizontal"
                            exclusive
                            name="options"
                            defaultValue={viewMode}
                            onChange={handleViewModeChange}
                            height='40px'
                            float='left'
                        >
                            <ToggleButton
                                value="Calendar"
                                selected={viewMode === "Calendar"}
                            >
                                <CalendarViewMonthTwoToneIcon />
                            </ToggleButton>
                            <ToggleButton
                                value="List"
                                selected={viewMode === "List"}
                            >
                                <ListTwoToneIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', }}>Bookings</Typography>
                    </Box>

                    <Box>
                        <Tooltip title="Delete All">
                            <IconButton
                                aria-label='account'
                                variant='contained'
                                onClick={() => deleteAllBookings()}
                                float='right'
                                height='40px'
                            >
                                <DeleteSweepIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box>
                        <Tooltip title="Add to Line-Up">
                            <IconButton
                                aria-label='account'
                                variant='contained'
                                onClick={() => editBooking(newBooking())}
                                float='right'
                                height='40px'
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Box
                    display='flex'
                    flex={1}
                    overflow='hidden'
                    flexDirection='column'
                    width='100%'
                    sx={{
                        // border: "1px solid yellow",
                    }}
                >

                    {viewMode === "Calendar" ?
                        <VDSBookingsCalendarWeek
                            bookings={bookings}
                            editBooking={editBooking}
                        />
                        :
                        <VDSBookingslistdev
                            bookings={bookings}
                            editBooking={editBooking}
                        />
                    }
                </Box>

                < Dialog open={bookingDialogOpen} onClose={handleBookingDialogClose}>
                    <DialogTitle>Vista Del Surf ✌🏄</DialogTitle>
                    <DialogContent>
                        <VDSErrorBoundary>
                            <VDSBookingForm
                                booking={currentbooking}
                                handleCreateBooking={handleCreateBooking}
                                handleDeleteBooking={handleDeleteBooking}
                                handleBookingDialogClose={handleBookingDialogClose}
                            >
                            </VDSBookingForm>
                        </VDSErrorBoundary>
                    </DialogContent>
                </Dialog>
            </Box >
        )
    );
}
