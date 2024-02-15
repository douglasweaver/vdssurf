import { useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';

import { gql, useQuery } from '@apollo/client';

import { VDSBookingsByDate } from '../graphql/queries';

import dayjs from 'dayjs';
var isBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isBefore);

const queryName = "VDSBookingsByDate"
const initDate = dayjs().add(-14, "day")

export const BookingsContext = createContext();

export function BookingsContextProvider({ children }) {

    const [earliestCheckOut, setEarliestCheckOut] = useState(initDate)

    const { client, data, loading, error, fetchMore, refetch } =
        useQuery(gql(VDSBookingsByDate),
            {
                notifyOnNetworkStatusChange: true,
                nextFetchPolicy: 'cache-first',
                variables: {
                    nextToken: null,
                    sortDirection: 'DESC',
                    limit: 5,
                    type: 'Booking',
                }
            }
        )

    useEffect(() => {

        if (!loading && earliestCheckOut) {
            let bookings = (data !== undefined) ? data[queryName].items : []
            if (bookings.length < 1 || dayjs(bookings[bookings.length - 1].checkOut).isAfter(earliestCheckOut)) {
                fetchMoreBookings()
            } else {
                setEarliestCheckOut(null)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, earliestCheckOut]);

    function fetchMoreBookings() {
        if (data !== undefined) {
            if (data[queryName]?.nextToken !== null) {
                console.log("STARTING ACTUAL FETCH")
                fetchMore({
                    variables: {
                        nextToken: data[queryName].nextToken,
                    },
                })
            }
        }
    }

const errorDiv = (() => {
    return (
        error && (
            <div>
                <p>{error.message}</p>
            </div>
        )
    )
})

function resetQuery(queryVariables) {
    client.resetStore()
    refetch(queryVariables)
}

const value = useMemo(() => {
    let bookings = (data !== undefined) ? data[queryName].items : []
    console.log("IN USEMEMO", loading, bookings.length)
    return ({
        bookings,
        setEarliestCheckOut,
        bookingsLoading: !(data !== undefined && data[queryName]?.nextToken === null)
            && (earliestCheckOut || loading),
        errorDiv
    })
}, [data])

return (
    <BookingsContext.Provider
        value={value}
    >
        {children}
    </BookingsContext.Provider>
);
}






