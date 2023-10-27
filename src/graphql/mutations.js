/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
      __typename
    }
  }
`;
