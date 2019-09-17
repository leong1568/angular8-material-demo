import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient) { }

  public register = (body) => {
    let url = environment.urlAddress + "/api/user/new"
    return this.http.post(url, body, this.generateHeaders());
  }
  
  public login = (body) => {
    let url = environment.urlAddress + "/api/user/login";
    return this.http.post(url, body, this.generateHeaders());
  }
  

  public deposit = (body) => {
    let url = environment.urlAddress + "/api/user/account/deposit";
    return this.http.post(url, body, this.generateHeaders());
  }

  public createAccount =(body)=>{
    let url = environment.urlAddress + "/api/user/account/new";
    return this.http.post(url, body, this.generateHeaders()); 
  }

  public getBalaceAmount = (route: string) =>{
     return this.http.get(this.createCompleteRoute(route, environment.urlAddress))
  }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }

  public create = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }
  
  public update = (route: string, body) => {
    return this.http.put(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }
  
  public delete = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }
  
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

 
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  } 
}
