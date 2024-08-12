import { useState, useEffect, createContext, useMemo } from 'react';

import { gql, useQuery, useMutation } from '@apollo/client';

import { VDSBookingsByDate } from '../../graphql/queries';
import {
    deleteVDSBooking,
    createVDSBooking,
    updateVDSBooking
} from '../../graphql/mutations';

import { dayjsPR } from '../../components/vdsdayjspr';

const queryName = "VDSBookingsByDate"
const initDate = dayjsPR().add(-4, "week").startOf("d")

export const BookingsContext = createContext();

export function BookingsContextProvider({ children }) {

    const [earliestCheckOut, setEarliestCheckOut] = useState(initDate)
    const [mutated, setMutated] = useState(true)

    const { data, loading, error, fetchMore } =
        useQuery(gql(VDSBookingsByDate),
            {
                notifyOnNetworkStatusChange: true,
                nextFetchPolicy: 'cache-first',
                variables: {
                    nextToken: null,
                    sortDirection: 'DESC',
                    limit: 10,
                    type: 'Booking',
                }
            }
        )

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

    const [updateBooking] = useMutation(gql(updateVDSBooking), {
        update(cache, { data: { updateVDSBooking } }) {
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
    })

    const contextDeleteBooking = ({ id, onError, onCompleted }) => {
        deleteBooking({
            variables: { input: { id: id } },
            onError: onError,
            onCompleted: (() => {
                onCompleted()
                setMutated(!mutated)
            })
        })
    }

    const contextUpdateBooking = ({ booking, onError, onCompleted }) => {
        updateBooking({
            variables: { input: booking },
            onError: onError,
            onCompleted: (() => {
                onCompleted()
                setMutated(!mutated)
            })
        })
    }

    const contextAddBooking = ({ booking, onError, onCompleted }) => {
        addBooking({
            variables: { input: booking },
            onError: onError,
            onCompleted: (() => {
                onCompleted()
                setMutated(!mutated)
            })
        })
    }

    useEffect(() => {

        // if (!loading) {
        //     console.log("NOT loading...check fibished")
        //     console.log(data)
        //     let bookings = (data !== undefined) ? data[queryName].items : []
        //     if (bookings.length < 1 || earliestCheckOut.isBefore(dayjs(bookings[bookings.length - 1].checkOut))) {
        //         fetchMoreBookings()
        //     } else {
        //         console.log("no need to fetch more")
        //     }
        // }
        if (!loading && earliestCheckOut) {
            let bookings = (data !== undefined) ? data[queryName].items : []
            if (bookings.length < 1 || earliestCheckOut.isBefore(dayjsPR(bookings[bookings.length - 1].checkOut))) {
                fetchMoreBookings()
            } else {
                // setEarliestCheckOut(null)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, earliestCheckOut]);

    function fetchMoreBookings() {
        if (data !== undefined) {
            if (data[queryName]?.nextToken !== null) {
                fetchMore({
                    variables: {
                        nextToken: data[queryName].nextToken,
                    },
                })
            }
        }
    }

    function changeEarliestCheckOut(date) {
        if (!earliestCheckOut || date.isBefore(earliestCheckOut)) {
            setEarliestCheckOut(date)
        }
    }

    // function resetQuery(queryVariables) {
    //     client.resetStore()
    //     refetch(queryVariables)
    // }

    const value = useMemo(() => {
        let bookings = (data !== undefined) ? data[queryName].items : []

        return ({
            bookings,
            earliestCheckOut,
            changeEarliestCheckOut,
            bookingsLoading: loading ||
                (!(data !== undefined && data[queryName]?.nextToken === null)
                && (bookings.length < 1 ||
                    earliestCheckOut.isBefore(dayjsPR(bookings[bookings.length - 1].checkOut)))),
                error,
            contextDeleteBooking,
            contextAddBooking,
            contextUpdateBooking,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [earliestCheckOut, mutated, loading])

    return (
        <BookingsContext.Provider
            value={value}
        >
            {children}
        </BookingsContext.Provider>
    );
}






