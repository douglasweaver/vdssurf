import Button from '@mui/material/Button';
import { useState, useEffect, useRef } from 'react';
import useOnScreen from '../useOnScreen';

import {
    gql,
    useQuery,
} from '@apollo/client';
import { VDSBookingsByDate } from '../../graphql/queries';

const bookingsByCheckInQueryVariables = {
    sortDirection: 'ASC',
    offset: 0,
    limit: 1000,
    type: 'Booking'
}

let passengerCounter = 0;

export default function usePaginatedBookings(
    bookingsCheckInCheckOut,
    defaultValue = false
) {

    const [bookings, setBookings] = useState([]);
    const [cursor, setCursor] = useState(0);

    const loadMoreRef = useRef();
    const isIntersecting = useOnScreen(loadMoreRef)

    // const bookingsRet = useQuery(gql(VDSBookingsByDate),
    //     { variables: bookingsByCheckInQueryVariables });

    // let tempBookings = (bookingsRet.data !== undefined) ? bookingsRet.data.VDSBookingsByDate.items : [];
    // // console.log("bookings: ", tempBookings)
    // console.log("Loading:",bookingsRet.loading)
    // console.log("Error:",bookingsRet.error)
    // console.log("ret", bookingsRet)

    // let loading = bookingsRet.loading

    async function fetchMoreBookings() {

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





