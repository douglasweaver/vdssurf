import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import InventoryIcon from '@mui/icons-material/Inventory';

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

    const { data, loading, error, fetchMore, refetch } =
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

    const toggleAllOrCurrentButton = (() => {
        return <Tooltip 
            title={startDate.isSame(initDate) ? "Goto Today" : "Goto Beginning Of Time"}>
            <IconButton
                aria-label='account'
                variant='contained'
                onClick={toggleAllOrCurrent}
                float='right'
                height='40px'
            >
                <InventoryIcon />
            </IconButton>
        </Tooltip>

    })

    function toggleAllOrCurrent() {

        if (startDate.isSame(initDate)) {
            setStartDate(currentDate)
            refetch({
                nextToken: null,
                checkOut: { ge: currentDate },
            })
        } else {
            setStartDate(initDate)
            refetch({
                nextToken: null,
                checkOut: { ge: initDate },
            })
        }
    }


    const loadMoreButton = (() => {
        return <Button onClick={fetchMoreBookings}
            disabled={loading}
            ref={loadMoreRef}
        >
            {loading ? "Loading..." :
                (data.VDSBookingsByDate.nextToken ? "Load More" : "End of Bookings")}
        </Button>
    })

    function fetchMoreBookings() {
        if (data.VDSBookingsByDate.nextToken !== null) {
            fetchMore({
                variables: {
                    nextToken: data.VDSBookingsByDate.nextToken,
                },
            })
        }
    }

    return {
        bookings: bookings,
        loadMoreButton: loadMoreButton,
        toggleAllOrCurrentButton: toggleAllOrCurrentButton,
        errorDiv: errorDiv
    }
}






