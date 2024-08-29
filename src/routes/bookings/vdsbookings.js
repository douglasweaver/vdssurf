import { useState, useRef, useContext, useCallback } from 'react';

import { BookingsContext } from './vdsBookingsContext'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';

import ListTwoToneIcon from '@mui/icons-material/ListTwoTone';
import CalendarViewMonthTwoToneIcon from '@mui/icons-material/CalendarViewMonthTwoTone';


// import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
// import { importCSVBookings } from './bookings/vdsbookingIMPORT';

import {
    VDSBookingForm,
    newBooking,
} from './vdsbookingform';

import VDSErrorBoundary from '../../components/vdserrorboundary';
import VDSBookingsList from './vdsbookinglist';
import VDSBookingsCalendar from './vdsbookingscalendar';

import { dayjsPR } from '../../components/vdsdayjspr';

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

const todayPR = dayjsPR().startOf("d")

export function VDSBookings() {

    const contextValues = useContext(BookingsContext);

    const [currentbooking, setCurrentBooking] = useState(newBooking());
    const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

    const [startDate, setStartDate] = useState(todayPR.day(0).add(-14, "day").day(0))

    const todayFocusRef = useRef(null);


    const handleBookingDialogClose = () => {
        setBookingDialogOpen(false);
    }

    // useEffect(() => {
    //     console.log("BOOKINGS USEeFFECT")

    //   }, [contextValues.bookingsLoading]);



    // const deleteAllBookings = () => {

    //     importCSVBookings().forEach(item => addBooking({ variables: { input: item } }));


    //     //     // bookings.forEach(bk => {
    //     //     //     deleteBooking({ variables: { input: { id: bk.id } } });
    //     //     //     // addBooking({ variables: { input: bk } });
    //     //     // });

    // }


    const editBooking = useCallback((booking) => {

        if (booking) {
            setCurrentBooking(booking);
            setBookingDialogOpen(true);
        }
    }, [])

    const [viewMode, setViewMode] = useState('Calendar');
    const handleViewModeChange = (event, newViewMode) => {
        setViewMode(newViewMode);
    };

    const handleOlderBookings = (event) => {
        const newStartDate = startDate.add(-12, "month").day(0)
        contextValues.changeEarliestCheckOut(newStartDate)
        setStartDate(newStartDate)
    }

    const handleToday = (event) => {
        if (todayFocusRef.current) {
            todayFocusRef.current?.scrollIntoView()
          }     
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
                }}
            >

                <Box
                    sx={{
                        paddingTop: 1,
                        paddingBottom: 1,
                        display: "flex",
                        justifyContent: 'space-between',
                        flexDirection: "row",
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexGrow: 1,
                            flexBasis: 0,
                            justifyContent: 'flex-start',
                            flexDirection: "row",
                        }}
                    >
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
                                <Tooltip title="Calendar View">
                                    <CalendarViewMonthTwoToneIcon />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton
                                value="List"
                                selected={viewMode === "List"}
                            >
                                <Tooltip title="List View">
                                    <ListTwoToneIcon />
                                </Tooltip>
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <Button variant="outlined"
                            height='40px'
                            onClick={handleOlderBookings}
                        >
                            {(viewMode === "Calendar" ? "Older Bookings" : "Older Bookings")}
                        </Button>

                        <Button variant="outlined"
                            height='40px'
                            onClick={handleToday}
                        >
                            {(viewMode === "Calendar" ? "Today" : "Today")}
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexGrow: 1,
                            flexBasis: 0,
                            justifyContent: 'center',
                        }}
                    >
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
                            display: "flex",
                            flexGrow: 1,
                            flexBasis: 0,
                            justifyContent: 'flex-end',
                        }}
                    >

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

                {/* {
                    <BookingsContextProvider> */}
                <VDSBookingForm
                    bookingDialogOpen={bookingDialogOpen}
                    booking={currentbooking}
                    handleBookingDialogClose={handleBookingDialogClose}
                />


                {viewMode === "Calendar" ?
                    <VDSBookingsCalendar
                        startDate={startDate}
                        todayFocusRef={todayFocusRef}
                        editBooking={editBooking}
                    />
                    :
                    <VDSBookingsList
                    todayFocusRef={todayFocusRef}
                    editBooking={editBooking}
                    />
                }
                {/* </BookingsContextProvider>


                } */}
            </Box >
        </VDSErrorBoundary >

    )
};

