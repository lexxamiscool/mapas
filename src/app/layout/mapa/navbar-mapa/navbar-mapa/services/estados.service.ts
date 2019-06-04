import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private http: HttpClient ) {}

  estados(){
    return this.http.get(environment.servicio + environment.estados);
  }

}
