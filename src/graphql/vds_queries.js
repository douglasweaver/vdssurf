/* eslint-disable */

export const VDSBookingsByCheckIn = /* GraphQL */ `
  query VDSBookingsByCheckIn(
    $type: String!
    $checkIn: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVDSBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    VDSBookingsByDate(
      type: $type
      checkIn: $checkIn
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        checkIn
        checkOut
        __typename
      }
      nextToken
      __typename
    }
  }
`;


// query VDSBookingsByCheckIn {
//   VDSBookingsByDate(
//     phoneNumber: { beginsWith: "+1" },
//      name: "Rene"
//      ) {
//     items {
//       id
//       name
//       phoneNumber
//     }
//   }
// }