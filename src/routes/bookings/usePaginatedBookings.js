import Button from '@mui/material/Button';

import { useState, useEffect, useRef } from 'react';
import useOnScreen from '../useOnScreen';

import {
    gql,
    useQuery,
} from '@apollo/client';
import { VDSBookingsByDate } from '../../graphql/queries';
import dayjs from 'dayjs';

const initDate = dayjs('2015-03-01')
const currentDate = dayjs().add(-14, "day")

export default function usePaginatedBookings() {

    const loadMoreRef = useRef();
    const isIntersecting = useOnScreen(loadMoreRef)

    const [startDate, setStartDate] = useState(currentDate)

    const { client, data, loading, error, fetchMore, refetch } =
        useQuery(gql(VDSBookingsByDate),
            {
                notifyOnNetworkStatusChange: true,
                nextFetchPolicy: 'cache-first',
                variables: {
                    nextToken: null,
                    checkOut: { ge: currentDate },
                    sortDirection: 'ASC',
                    limit: 10,
                    type: 'Booking',
                }
            }
        )

    let bookings = (data !== undefined) ? data.VDSBookingsByDate.items : []

    useEffect(() => {
        if (isIntersecting && !loading) {
            fetchMoreBookings();
        }
    }, [isIntersecting, loading]);

    const errorDiv = (() => {

        return (
            error && (
                <div>
                    <p>{error.message}</p>
                </div>
            )
        )
    })

    function changeBookingsStartDate(toDate) {

        console.log(toDate)
        let newDate = (toDate !== undefined) ? toDate :
            (startDate.isSame(initDate) ? currentDate : initDate)
        console.log(newDate)
        setStartDate(newDate)
        client.resetStore()
        refetch({
            nextToken: null,
            checkOut: { ge: newDate },
        })
    }

    const loadMoreButton = (() => {
        return <Button onClick={fetchMoreBookings}
            disabled={loading}
            ref={loadMoreRef}
        >
            {loading ? "Loading..." :
                (data?.VDSBookingsByDate.nextToken ? "Load More" : "End of Bookings")}
        </Button>
    })

    function fetchMoreBookings() {
        if (data !== undefined) {
            if (data?.VDSBookingsByDate.nextToken !== null) {
                fetchMore({
                    variables: {
                        nextToken: data.VDSBookingsByDate.nextToken,
                    },
                })
            }
        }
    }

    return {
        bookings: bookings,
        loadMoreButton: loadMoreButton,
        changeBookingsStartDate: changeBookingsStartDate,
        errorDiv: errorDiv
    }
}






