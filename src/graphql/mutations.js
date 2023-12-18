/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVDSBooking = /* GraphQL */ `
  mutation CreateVDSBooking(
    $input: CreateVDSBookingInput!
    $condition: ModelVDSBookingConditionInput
  ) {
    createVDSBooking(input: $input, condition: $condition) {
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
export const updateVDSBooking = /* GraphQL */ `
  mutation UpdateVDSBooking(
    $input: UpdateVDSBookingInput!
    $condition: ModelVDSBookingConditionInput
  ) {
    updateVDSBooking(input: $input, condition: $condition) {
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
export const deleteVDSBooking = /* GraphQL */ `
  mutation DeleteVDSBooking(
    $input: DeleteVDSBookingInput!
    $condition: ModelVDSBookingConditionInput
  ) {
    deleteVDSBooking(input: $input, condition: $condition) {
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
export const createVDSNote = /* GraphQL */ `
  mutation CreateVDSNote(
    $input: CreateVDSNoteInput!
    $condition: ModelVDSNoteConditionInput
  ) {
    createVDSNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateVDSNote = /* GraphQL */ `
  mutation UpdateVDSNote(
    $input: UpdateVDSNoteInput!
    $condition: ModelVDSNoteConditionInput
  ) {
    updateVDSNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteVDSNote = /* GraphQL */ `
  mutation DeleteVDSNote(
    $input: DeleteVDSNoteInput!
    $condition: ModelVDSNoteConditionInput
  ) {
    deleteVDSNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
