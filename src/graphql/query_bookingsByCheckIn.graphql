/* eslint-disable */
export const bookingsByCheckIn = /* GraphQL */ `
  query BookingsByCheckIn(
    $type: String!
    $checkIn: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVDSBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookingsByCheckIn(
      type: $type
      checkIn: $checkIn
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        guests
        description
        checkIn
        checkOut
        levels
        autos
        commitment
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
