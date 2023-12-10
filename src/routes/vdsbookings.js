import { useState, useEffect } from 'react';
import useBookingManager from './bookings/vdsbookingmanager';
import usePaginatedBookings from './bookings/usePaginatedBookings';
import VDSBookingsList from './bookings/vdsbookinglist';
import VDSBookingsCalendar from './bookings/vdsbookingscalendar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import CalendarViewMonthTwoToneIcon from '@mui/icons-material/CalendarViewMonthTwoTone';

import { newBooking } from './bookings/vdsbookingform';

  export function vdsBookingsFindDate(bookings, targetDate) {
    bookings.findIndex(bk => targetDate.isSameOrBefore(bk.checkIn, 'day'))
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

export default function VDSBookings() {

    const { bookingDialog, editBooking } = useBookingManager()

    const { bookings,
        loadMoreButton,
        toggleAllOrCurrentButton,
        errorDiv } = usePaginatedBookings()

    const [viewMode, setViewMode] = useState('Calendar');
    const handleViewModeChange = (event, newViewMode) => {
        setViewMode(newViewMode);
    };

   
    return (

        <Box
            sx={{
                mt: 2,
                mb: 0,
                display: "flex",
                flexDirection: "column",
                width: '100%',
                height: '100%',
                overflow: "hidden",
                // overflowY: "scroll",
                // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
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

                {/* <Box>
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
                </Box> */}

                <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Box>
                        {toggleAllOrCurrentButton()}
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


            </Box>

            {bookingDialog()}

            {errorDiv()}

            {
                viewMode === "Calendar" ?
                    <VDSBookingsCalendar
                        bookings={bookings}
                        editBooking={editBooking}
                        loadMoreButton={loadMoreButton}
                    />
                    :
                    <VDSBookingsList
                        bookings={bookings}
                        editBooking={editBooking}
                        loadMoreButton={loadMoreButton}
                    />
            }
        </Box >
    )
};
