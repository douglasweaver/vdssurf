import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import useOnScreen from '../useOnScreen';

import {
    gql,
    useQuery,
} from '@apollo/client';
import { vDSBookingsByDate } from '../../graphql/queries';

const bookingsByCheckInQueryVariables = {
    sortDirection: 'ASC',
    offset: 0,
    limit: 10,
    type: 'Booking'
}

let passengerCounter = 0;

export default function usePaginatedBookings(
    defaultValue = false
) {

    const [bookings, setBookings] = useState([]);
    const loadMoreRef = useRef();
    const isIntersecting = useOnScreen(loadMoreRef)

    const bookingsRet = useQuery(gql(vDSBookingsByDate),
        { variables: bookingsByCheckInQueryVariables });

    let tempBookings = (bookingsRet.data !== undefined) ? bookingsRet.data.VDSBookingsByDate.items : [];
    // console.log("bookings: ", tempBookings)
    console.log("Loading:",bookingsRet.loading)
    console.log("Error:",bookingsRet.error)
    console.log("ret", bookingsRet)

    let loading = bookingsRet.loading

    async function fetchMorePosts() {

        const data = [...tempBookings]
        setBookings((prevState) => [...prevState, ...data]);
    }

    const loadMoreButton = (() => {
        return <Button onClick={() => { fetchMorePosts() }}
            disabled={loading}
            ref={loadMoreRef}
        >
            {loading ? "Loading..." : "Load More"}
        </Button>
    })

    useEffect(() => {
        if (isIntersecting) {
            console.log("FETCH")
            fetchMorePosts();
        }
    }, [isIntersecting]);


    return { bookings: bookings, loadMoreButton: loadMoreButton }
}





