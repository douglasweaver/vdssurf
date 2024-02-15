import { useState, useEffect, useRef } from 'react';

import { gql, useQuery } from '@apollo/client';

import { VDSBookingsByDate } from '../graphql/queries';

import dayjs from 'dayjs';
var isBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isBefore);

const queryName = "VDSBookingsByDate"

export default function useStagedItems({
    initDate
}) {

    const [reloadCheck, setReloadCheck] = useState(true)
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

    let items = (data !== undefined) ? data[queryName].items : []

    const fetchMoreBooleanFn = (() => {
        return (items.length < 1 || dayjs(items[items.length - 1].checkOut).isAfter(earliestCheckOut))
    })

    useEffect(() => {
        if (reloadCheck && !loading) {
            if (fetchMoreBooleanFn(items)) {
                fetchMoreItems();
            } else {
                setReloadCheck(false)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, reloadCheck]);

    const errorDiv = (() => {
        return (
            error && (
                <div>
                    <p>{error.message}</p>
                </div>
            )
        )
    })

    const moveBeginDate = ((checkOutDate) => {
        if (checkOutDate.isBefore(earliestCheckOut) &&
                !(data !== undefined && data[queryName]?.nextToken === null))        
        {
            console.log("UODATING EARLIEST CHECKOUT", checkOutDate)
            setEarliestCheckOut(checkOutDate)
            setReloadCheck(true)
        }
    })

    function resetQuery(queryVariables) {
        client.resetStore()
        refetch(queryVariables)
    }

    function fetchMoreItems(e) {
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

    return {
        bookings: items,
        loading: loading,
        endOfData: (data !== undefined && data[queryName]?.nextToken === null),
        moveBeginDate: moveBeginDate,
        stagedLoading: !(data !== undefined && data[queryName]?.nextToken === null)
            && (reloadCheck || loading),
        resetQuery: resetQuery,
        errorDiv: errorDiv,
    }
}






