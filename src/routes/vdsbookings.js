import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import CalendarViewMonthTwoToneIcon from '@mui/icons-material/CalendarViewMonthTwoTone';
import InventoryIcon from '@mui/icons-material/Inventory';

import {
    gql,
} from '@apollo/client';
import { VDSBookingsByDate } from '../graphql/queries';

// import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
// import { importCSVBookings } from './bookings/vdsbookingIMPORT';

import {
    VDSBookingForm,
    newBooking,
} from './bookings/vdsbookingform';

import VDSErrorBoundary from '../components/vdserrorboundary';
import usePaginatedItems from './usePaginatedItems';
import VDSBookingsList from './bookings/vdsbookinglist';
import VDSBookingsCalendar from './bookings/vdsbookingscalendar';

import dayjs from 'dayjs';

const initDate = dayjs('2015-03-01')
const currentDate = dayjs().add(-14, "day")

const debugIcon = false

export const vdsBookingsTypePolicies =
{
    VDSBookingsByDate: {
        keyArgs: false,
        merge(existing, incoming, { readField }) {
            if (existing === undefined) return incoming
            const items = (existing ? existing.items : []).concat(incoming.items)
            return {
                ...existing,
                items: items,
                nextToken: incoming.nextToken,
            };
        },
        // read(existing) {
        //     if (existing) {
        //         return {
        //             nextToken: existing.nextToken,
        //             items: existing.items,
        //             // items: Object.values(existing.items),
        //         };
        //     }
        // },
    },
}


export function VDSBookings() {

    const [currentbooking, setCurrentBooking] = useState(newBooking());
    const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

    const handleBookingDialogClose = () => {
        setBookingDialogOpen(false);
    }

    // const deleteAllBookings = () => {

    //     importCSVBookings().forEach(item => addBooking({ variables: { input: item } }));

    //     //     console.log("Delete all bookings")
    //     //     console.log(bookings)

    //     //     // bookings.forEach(bk => {
    //     //     //     console.log(bk.id)
    //     //     //     deleteBooking({ variables: { input: { id: bk.id } } });
    //     //     //     // addBooking({ variables: { input: bk } });
    //     //     // });

    // }

    const editBooking = (booking) => {

        if (booking) {
            setCurrentBooking(booking);
            setBookingDialogOpen(true);
        }
    }

    const [startDate, setStartDate] = useState(currentDate)

    const {
        items: bookings,
        loadMoreButton,
        resetQuery,
        errorDiv } = usePaginatedItems({
            gqlQuery: gql(VDSBookingsByDate),
            queryName: "VDSBookingsByDate",
            queryVariables: {
                checkOut: { ge: currentDate },
                sortDirection: 'ASC',
                limit: 10,
                type: 'Booking',
            }
        })
    const [viewMode, setViewMode] = useState('Calendar');
    const handleViewModeChange = (event, newViewMode) => {
        setViewMode(newViewMode);
    };

    const changeBookingsStartDate = (toDate) => {
        let newDate = (toDate !== undefined) ? toDate :
            (startDate.isSame(initDate) ? currentDate : initDate)
        setStartDate(newDate)
        resetQuery({
            nextToken: null,
            checkOut: { ge: newDate },
        })
    }

    return (
        <VDSErrorBoundary>
            <Box
                sx={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    width: '100%',
                    height: '100%',
                    overflowX: "auto",
                    overflowY: "hidden",
                    // overflowY: "scroll",
                    // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                }}
            >

                <Box
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{
                        paddingTop: 1,
                        paddingBottom: 1,
                        display: "flex",
                        flexDirection: "row",
                        width: '100%',
                        // border: "13px solid green",
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
                        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', }}>
                            Bookings
                        </Typography>
                    </Box>


                    {/* {debugIcon &&
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
                    } */}

                    <Box
                        sx={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            display: "flex",
                            flexDirection: "row",
                        }}

                    >
                        <Box>
                            <Tooltip
                                title={startDate.isSame(initDate) ? "Goto Today" : "Goto Beginning Of Time"}>
                                {/* title="Toggle Date"> */}
                                <IconButton
                                    aria-label='account'
                                    variant='contained'
                                    onClick={() => { changeBookingsStartDate() }}
                                    float='right'
                                    height='40px'
                                >
                                    <InventoryIcon />
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


                </Box>

                <VDSBookingForm
                    bookingDialogOpen={bookingDialogOpen}
                    booking={currentbooking}
                    handleBookingDialogClose={handleBookingDialogClose}
                />

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
        </VDSErrorBoundary>

    )
};




