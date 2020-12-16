import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OdataServices } from './odata.services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
  , providers: [
    OdataServices
  ],
  exports :[
    HttpClientModule,
  ]

})
export class ServicesModule { }
