import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

    login(user: string, pass: string) {
       return this.http.post(environment.servicio + environment.prueba, {
         usuario:  user,
         password: pass
       });
    }
  
}
