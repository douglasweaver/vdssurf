import Button from '@mui/material/Button';

import { useEffect, useRef } from 'react';
import useOnScreen from './useOnScreen';

import {
    useQuery,
} from '@apollo/client';

export default function usePaginatedItems({
    gqlQuery,
    queryName,
    queryVariables
}) {

    const loadMoreRef = useRef();
    const isIntersecting = useOnScreen(loadMoreRef)

    const { client, data, loading, error, fetchMore, refetch } =
        useQuery(gqlQuery,
            {
                notifyOnNetworkStatusChange: true,
                nextFetchPolicy: 'cache-first',
                variables: {
                    nextToken: null,
                    ...queryVariables
                }
            }
        )
    
    let items = (data !== undefined) ? data[queryName].items : []

    useEffect(() => {
        if (isIntersecting && !loading) {
            fetchMoreItems();
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

    function resetQuery(queryVariables) {

        client.resetStore()
        refetch(queryVariables)
    }

    const loadMoreButton = (() => {
        return <Button onClick={fetchMoreItems}
            disabled={loading}
            ref={loadMoreRef}
        >
            {loading ? "Loading..." :
                (data[queryName]?.nextToken ? "Load More" : "End of Items")}
        </Button>
    })

    function fetchMoreItems() {
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
        items: items,
        loadMoreButton: loadMoreButton,
        resetQuery: resetQuery,
        errorDiv: errorDiv
    }
}






