import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParroquiasService {

  constructor(private http: HttpClient) { }

  parroquias(idEdo, idMun){
    
    return this.http.get(environment.servicio + environment.parroquias + '/'+ idEdo +'/'+idMun);
  }
}
