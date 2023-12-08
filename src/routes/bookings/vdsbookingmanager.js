import {useState} from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import {
    gql,
    useMutation,
} from '@apollo/client';
import {
    deleteVDSBooking,
    createVDSBooking,
    updateVDSBooking
} from '../../graphql/mutations';

// import { importCSVBookings } from './vdsbookingIMPORT';

import {
    VDSBookingForm,
    newBooking,
} from './vdsbookingform';

import VDSErrorBoundary from '../../components/vdserrorboundary';

export default function useBookingManager() {

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

    const [updateBooking, updateRet] = useMutation(gql(updateVDSBooking));

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

    return {
        bookingDialog: bookingDialog,
        editBooking: editBooking
    }
}
