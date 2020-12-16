import { AddressInfoDTO } from './address.info.dto';

export interface PeopleDTO {
  "UserName": string,
  "FirstName": string,
  "LastName": string,
  "MiddleName": string,
  "Gender": string,
  "Age": string,
  "Emails": string [],
  "FavoriteFeature": string,
  "Features": [],
  "AddressInfo": AddressInfoDTO[],
  "HomeAddress": string
}
