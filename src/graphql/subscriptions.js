/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVDSBooking = /* GraphQL */ `
  subscription OnCreateVDSBooking(
    $filter: ModelSubscriptionVDSBookingFilterInput
    $owner: String
  ) {
    onCreateVDSBooking(filter: $filter, owner: $owner) {
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
export const onUpdateVDSBooking = /* GraphQL */ `
  subscription OnUpdateVDSBooking(
    $filter: ModelSubscriptionVDSBookingFilterInput
    $owner: String
  ) {
    onUpdateVDSBooking(filter: $filter, owner: $owner) {
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
export const onDeleteVDSBooking = /* GraphQL */ `
  subscription OnDeleteVDSBooking(
    $filter: ModelSubscriptionVDSBookingFilterInput
    $owner: String
  ) {
    onDeleteVDSBooking(filter: $filter, owner: $owner) {
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
