import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PuntosReferenciaService {

  constructor(private http: HttpClient) { }
  puntosReferencia(id){
    let data = {
      "codigoEstado" : id.estado,
      "codigoMunicipio":id.municipio,
      "codigoParroquia": id.parroquia
    }
    return this.http.post(environment.servicio + environment.puntos_referencia,data);
  }
}
