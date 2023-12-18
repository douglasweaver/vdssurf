import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import CalendarViewMonthTwoToneIcon from '@mui/icons-material/CalendarViewMonthTwoTone';
import InventoryIcon from '@mui/icons-material/Inventory';

import {
    gql,
    useMutation,
} from '@apollo/client';
import {
    deleteVDSBooking,
    createVDSBooking,
    updateVDSBooking
} from '../graphql/mutations';
import { VDSBookingsByDate } from '../graphql/queries';

// import { importCSVBookings } from './vdsbookingIMPORT';

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

// const deleteAllBookings = () => {

//     importCSVBookings().forEach(item => addBooking({ variables: { input: item } }));

//     console.log("Delete all bookings")
//     console.log(bookings)

//     bookings.forEach(bk => {
//         console.log(bk.id)
//         deleteBooking({ variables: { input: { id: bk.id } } });
//         // addBooking({ variables: { input: bk } });
//     });

// }

export function VDSBookings() {
    
        const [currentbooking, setCurrentBooking] = useState(newBooking());
        const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
    
        const [deleteBooking] = useMutation(gql(deleteVDSBooking), {
            update(cache, { data: { deleteVDSBooking } }) {
                cache.modify({
                    fields: {
                        VDSBookingsByDate(previous) {
                            let final = previous.items.filter((e) => (
                                cache.data.data[e.__ref].id !== deleteVDSBooking.id
                            ));
                            return {
                                ...previous,
                                items: final,
                            }
                        }
                    }
                })
            }
        })
    
        const [addBooking] = useMutation(gql(createVDSBooking), {
    
            update(cache, { data: { createVDSBooking } }) {
                cache.modify({
                    fields: {
                        VDSBookingsByDate(previous) {
                            const newBookingRef = cache.writeFragment({
                                data: createVDSBooking,
                                fragment: gql`
                                    fragment NewBooking on VDSBooking {
                                        id
                                        guests
                                        description
                                        checkIn
                                        checkOut
                                        levels
                                        autos
                                        commitment
                                        type
                                    }
                                    `
                            });
    
                            let existingBookings = previous.items
                            let start = existingBookings.findIndex((e) => {
                                return cache.data.data[e.__ref].checkOut > createVDSBooking.checkOut
                            });
                            start = start < 0 ? existingBookings.length : start
                            let final = {
                                ...previous,
                                items: existingBookings.toSpliced(start, 0, newBookingRef)
                            }
                            return final
                        }
                    }
                })
            }
        });
    
        const [updateBooking] = useMutation(gql(updateVDSBooking));
    
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
    
    
        // const deleteAllBookings = () => {
    
        //     importCSVBookings().forEach(item => addBooking({ variables: { input: item } }));
    
        //     console.log("Delete all bookings")
        //     console.log(bookings)
    
        //     bookings.forEach(bk => {
        //         console.log(bk.id)
        //         deleteBooking({ variables: { input: { id: bk.id } } });
        //         // addBooking({ variables: { input: bk } });
        //     });
    
        // }
    
        const editBooking = (booking) => {
    
            // testBookings().forEach(bk => {
            //     addBooking({ variables: { input: bk } });
            // });
    
            if (booking) {
                setCurrentBooking(booking);
                handleBookingDialogOpen();
            }
        }
    
    
        const bookingDialog = (() => {
            return < Dialog open={bookingDialogOpen} onClose={handleBookingDialogClose}>
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
        })

    const [startDate, setStartDate] = useState(currentDate)

    const {
        items: bookings,
        loadMoreButton,
        resetQuery,
        errorDiv } = usePaginatedItems({
            gqlQuery: gql(VDSBookingsByDate),
            queryName : "VDSBookingsByDate",
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
                        <Tooltip
                            // title={startDate.isSame(initDate) ? "Goto Today" : "Goto Beginning Of Time"}>
                            title="Toggle Date">
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
