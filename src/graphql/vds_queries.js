/* eslint-disable */
export const listVDSBookingsByCheckIn = /* GraphQL */ `
  query listVDSBookingsByCheckIn(
    $filter: ModelVDSBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVDSBookingsByCheckIn(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        guests
        description
        checkIn
        checkOut
        levels
        autos
        commitment
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
