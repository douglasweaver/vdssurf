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
import {
    bookingsByCheckIn,
} from '../graphql/queries';

import {
    VDSBookingForm,
    newBooking,
} from './bookings/vdsbookingform';

import VDSBookingsCalendarWeek from './bookings/vdsbookingscalendarweek';
import VDSBookingsList from './bookings/vdsbookingslistvirtual';
import VDSErrorBoundary from '../components/vdserrorboundary';


const bookingsByCheckInQueryVariables =  { 
    type: "Booking", 
    sortDirection: 'ASC',
    limit: 1000,
 }


export function vdsBookingsFindDate(bookings, targetDate) {
    bookings.findIndex(bk => targetDate.isSameOrBefore(bk.checkIn, 'day'))
}

export default function VDSBookings() {

    const [currentbooking, setCurrentBooking] = React.useState(newBooking());
    const [bookingDialogOpen, setBookingDialogOpen] = React.useState(false);

    const bookingsRet = useQuery(gql(bookingsByCheckIn),
        { variables: bookingsByCheckInQueryVariables });

    const [deleteBooking, deleteRet] =
        useMutation(gql(deleteVDSBooking),
            {
                refetchQueries: () => [{
                    query: gql(bookingsByCheckIn),
                    variables: bookingsByCheckInQueryVariables,
                }],
            }
        );

    const [addBooking, addRet] = useMutation(gql(createVDSBooking),
        {
            refetchQueries: () => [{
                query: gql(bookingsByCheckIn),
                variables:  bookingsByCheckInQueryVariables,
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

    const editBooking = (booking) => {

        // importBookings.forEach(bk => {
        //     addBooking({ variables: { input: bk } });
        // });
    
        if (booking) {
            setCurrentBooking(booking);
            handleBookingDialogOpen();
        }
    }

    let bookings = (bookingsRet.data !== undefined) ? bookingsRet.data.bookingsByCheckIn.items : [];
    // let bookings = (bookingsRet.data !== undefined) ? bookingsRet.data.bookingsByCheckIn.items : testBookings();

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
                        <VDSBookingsList
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
