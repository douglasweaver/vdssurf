/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const bookingsByCheckIn = /* GraphQL */ `
  query BookingsByCheckIn(
    $checkIn: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVDSBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bookingsByCheckIn(
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;