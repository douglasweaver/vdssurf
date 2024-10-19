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
      owner
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
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getVDSNote = /* GraphQL */ `
  query GetVDSNote($id: ID!) {
    getVDSNote(id: $id) {
      id
      name
      comments
      fileName
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listVDSNotes = /* GraphQL */ `
  query ListVDSNotes(
    $filter: ModelVDSNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVDSNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        comments
        fileName
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const VDSBookingsByDate = /* GraphQL */ `
  query VDSBookingsByDate(
    $type: String!
    $checkOut: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVDSBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    VDSBookingsByDate(
      type: $type
      checkOut: $checkOut
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
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
