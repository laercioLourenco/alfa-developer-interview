import { PeopleNewDTO } from './../app/models/people.new.dto';
import { PeopleDTO } from './../app/models/people.dto';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/configs/api.config';

@Injectable()
export class OdataServices {
  constructor(
    private http: HttpClient,
  ){

  }
  findByNameContains (stringKey : string): Observable<PeopleDTO[]> {
      return this.http.get<PeopleDTO[]>(`${API_CONFIG.baseUrl}/People?$filter=contains(FirstName, '${stringKey}'  ) or contains(LastName, '${stringKey}'  )  `)
  }

  createNewUser ( newUser : PeopleNewDTO){
    /*
      Necessario acrescebtar o header de cors

    */
    const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Credentials','true')
  .set('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
  .set('Access-Control-Allow-Methods','GET, POST PUT, DELETE, OPTIONS')
  .set('Content-Type','application/json');
    return this.http.post<any>(`${API_CONFIG.baseUrl}/(S(psie2c5uldy10bd1szj0oho1))/People` ,newUser, {'headers': headers})
  }

  deleteUser (userName : string){
    return this.http.delete(`${API_CONFIG.baseUrl}/(S(psie2c5uldy10bd1szj0oho1))/People('${userName}')` ,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  findByLocationContainsDistrict(){
    return this.http.get(`${API_CONFIG.baseUrl}/Airports?$filter=contains(Location/Address, 'District')`);
  }
}
