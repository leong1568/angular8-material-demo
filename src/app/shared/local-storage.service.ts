import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public register = (body) => {
    let users = JSON.parse(localStorage.getItem("users"));
    users.append(body);
    localStorage.setItem("users", users);
  }
  
  public login = (body) => {
    let users = JSON.parse(localStorage.getItem("users"));
    localStorage.setItem("authorized", "ture");
  }
  

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  } 
}
