import usePaginatedBookings from './usePaginatedBookings';

function VDSBooking({
    booking,
}) {
    console.log(booking)
    return (
        // *** I simplified this for the example
        <div style={{ height: '25vh' }}>
            <p>name: {booking.guests}</p>
        </div>
    )
}

export default function VDSBookingslistdev({
    books,
    editBooking,
}) {
    const { bookings, loadMoreButton } = usePaginatedBookings()

    return (
        <div style={{ overflowY: 'scroll' }}>
            {
                bookings.map((passenger, idx) => {
                    return <VDSBooking booking={passenger} key={idx} />
                })
            }
            {loadMoreButton()}
        </div>
    )
};

