import { AddressInfoDTO } from './address.info.dto';

export interface PeopleNewDTO {
  "UserName": string,
  "FirstName": string,
  "LastName": string,
  "Emails": string [],
  "AddressInfo": AddressInfoDTO[],

}
