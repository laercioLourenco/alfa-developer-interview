import { AddressInfoDTO } from './../../models/address.info.dto';
import { PeopleNewDTO } from './../../models/people.new.dto';
import { PeopleDTO } from './../../models/people.dto';
import { OdataServices } from './../../../services/odata.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'test-odata-service';
  peoples : PeopleDTO[] =[];
  selection1 = '';
  consoleContent = '';
  createUser = false;
  deleteUSer = false;

  datasToSend= '';

  newPeople : PeopleNewDTO ={
    UserName : '',
    FirstName : '',
    LastName: '',
    Emails : [],
    AddressInfo : []
  };

  formUserName= '';
  formFirstName= '';
  formLastName= '';
  formEmails= '';
  formCity= '';
  formAddress= '';
  formCountry= '';

  formUserDelName =''

  constructor(
    private service : OdataServices
  ) { }

  ngOnInit(): void {
  }

  getHenry(){
    this.createUser=false;
    this.deleteUSer = false;
    this.consoleContent=''
    this.service.findByNameContains('Sc').subscribe(
      response => {
        this.peoples = response;
        this.consoleContent = JSON.stringify( this.peoples);
        this.selection1 = 'getPeople'
      },
      error=> {
        console.log(error);
        this.consoleContent = JSON.stringify(error);
      }
    )
  }

  createNewUser (){
    this.selection1='newuser'
    this.newPeople.UserName = this.formUserName;
    this.formUserDelName = this.formUserName
    this.newPeople.FirstName = this.formFirstName;
    this.newPeople.LastName= this.formLastName;
    this.newPeople.Emails.push( this.formEmails);
    let address : AddressInfoDTO = {
      Address: this.formAddress,
      City :{
        Name: this.formCity,
        CountryRegion: this.formCountry,
        Region: "ID"

      }
    }
    this.newPeople.AddressInfo.push(address);
    this.datasToSend= JSON.stringify(this.newPeople);;


    this.service.createNewUser(this.newPeople).subscribe(
      response=> {
        this.consoleContent = JSON.stringify(response);
      },
      error=>{
        let msgError
        if(error.status == 0){
          msgError = 'Error de cors \n O servidor o Odata implementa politicas de cors para metodos post'+
          'Solução temporaria:\n'+
          'Abra seu navagedor desabilitando segurança de cors'+
          '\nProcedimento google Chrome\n'+
          'abra o terminal do windows na pasta de instalação do google chrome \n'+
          'Execute o seguinte comando : \n'+
          'chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security'

          this.consoleContent = msgError;
        }

        console.log(error);
      }

    );

  }
  createViewNewUser(){
    this.selection1='newuser'
    this.deleteUSer = false;
    this.createUser=true;
    this.consoleContent=''
  }
  deleteViewUserName(){
    this.selection1='deleteuser'
    this.deleteUSer = true;
    this.createUser=false;
    this.consoleContent=''
  }

  deleteByUserName (){

    this.service.deleteUser(this.formUserDelName).subscribe(
      response => {
        this.consoleContent = 'Usuario deletado \n';
        this.consoleContent += JSON.stringify(response);
      },
      error =>{
        this.consoleContent = JSON.stringify(error);
      });
  }

  getAirportsContainsDistrict(){
    this.selection1='findairport'
    this.deleteUSer = false;
    this.createUser=false;
    this.consoleContent=''
    this.service.findByLocationContainsDistrict().subscribe(
      response=>{
        this.consoleContent += JSON.stringify(response);
      },
      error=>{
        this.consoleContent = JSON.stringify(error);
      }
    )
  }
}
