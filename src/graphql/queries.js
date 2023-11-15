/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVDSBooking = /* GraphQL */ `
  query GetVDSBooking($id: ID!) {
    getVDSBooking(id: $id) {
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
      __typename
    }
  }
`;
export const listVDSBookings = /* GraphQL */ `
  query ListVDSBookings(
    $filter: ModelVDSBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVDSBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const vDSBookingsByDate = /* GraphQL */ `
  query VDSBookingsByDate(
    $type: String!
    $checkInCheckOut: ModelVDSBookingVDSBookingsByDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVDSBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    VDSBookingsByDate(
      type: $type
      checkInCheckOut: $checkInCheckOut
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
