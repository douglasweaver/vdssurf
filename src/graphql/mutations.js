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
