/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVDSBooking = /* GraphQL */ `
  subscription OnCreateVDSBooking(
    $filter: ModelSubscriptionVDSBookingFilterInput
  ) {
    onCreateVDSBooking(filter: $filter) {
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
export const onUpdateVDSBooking = /* GraphQL */ `
  subscription OnUpdateVDSBooking(
    $filter: ModelSubscriptionVDSBookingFilterInput
  ) {
    onUpdateVDSBooking(filter: $filter) {
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
export const onDeleteVDSBooking = /* GraphQL */ `
  subscription OnDeleteVDSBooking(
    $filter: ModelSubscriptionVDSBookingFilterInput
  ) {
    onDeleteVDSBooking(filter: $filter) {
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
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
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
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
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
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
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
