import { Component, OnInit } from '@angular/core';
import { PuntosReferenciaService } from './navbar-mapa/navbar-mapa/services/puntos-referencia.service'
import { addToViewTree } from '@angular/core/src/render3/instructions';
import { e } from '@angular/core/src/render3';
declare let L;
/**
 *Clase que maneja la creación del mapa y los puntos 
 * @export
 * @class MapaComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})


export class MapaComponent implements OnInit {
  //map variable tipo any que guardara el mapa
  map: any;
  //icon variable tipo any que guardara el icono
  icon: any;
  //coordenadas variable tipo any que almacena las coordenadas
  coordenadas: any;
  //marcadores arreglo vacio que permite almacenar los marcadores 
  marcadores = []
  //Variable layerGroup para almacenar los distintos marcadores
  layerGroup;
  //alertaMensaje variable tipo  string que guardara el mensaje que se le mostrara al usuario
  alertaMensaje: string
  //AlertaAviso variable tipo boolean que permite ocultar el mensaje 
  alertaAviso: boolean

  


  constructor(
    private puntosReferenciaService: PuntosReferenciaService
  ) { }
  /**
   * Crea el mapa que se mostrara al usuario utilizando los distintos metodos que ofrece Leaflet
   * @method ngOnInit
   * @memberof MapaComponent
   */
  ngOnInit() {

    this.map = L.map('map').setView([10.50, -66.80], 12);
    L.tileLayer.wms('http://maps-geo.sigisweb.net/geoserver/gwc/service/wms', {
      layers: 'BaseMap:BaseMap',
      format: 'image/png',
      attribution: "<a href='http://www.sigis.com.ve/'>Sigis Soluciones Integrales GIS.C.A</a> © 2019 SIGIS"
    }).addTo(this.map);
    this.icon = L.icon({
      iconUrl: '../../../assets/images/green-marker3.png',
    });

    this.map.on('click', (e) => { this.mapClick(e) });

  }
  /**
   *Metodo que permite recibir los datos que son enviados desde el componente navabar-mapa.component.ts
   *@method procesarDatos
   * @param {*} mensaje
   * @memberof MapaComponent
   */
  procesarDatos(mensaje) {

    let coordenadasy: number
    let coordenadasx: number
    let marcador;
    let coordenadaNombre: any
    let i = 0;

    this.borrarMarkers();
    this.puntosReferenciaService.puntosReferencia(mensaje).subscribe(
      (data: any) => {

        for (i; i < data.data.length; i++) {
          coordenadaNombre = data.data[i].puntoReferenciaNombre;
          coordenadasy = data.data[i].puntoReferenciaCoo['coordinates'][0]
          coordenadasx = data.data[i].puntoReferenciaCoo['coordinates'][1]
          this.coordenadas = [coordenadasx, coordenadasy];

          marcador = L.marker(this.coordenadas, { icon: this.icon })
            .bindPopup('<strong>Nombre del punto de referencia <br>' + coordenadaNombre + '<br>Coordenadas</strong><br> LON:'
              + coordenadasy + '<br>' + 'LAT:' + coordenadasx);
          this.marcadores.push(marcador);

          i++;
        }
        this.layerGroup = L.layerGroup(this.marcadores).addTo(this.map);
        this.map.addLayer(this.layerGroup);
        this.recibirAlertaDos();

        console.log(this.marcadores);
        console.log(this.coordenadas);
      });
  }
  /**
   * Metodo que recibe alerta desde el navbar-mapa.component
   * @method recibirAlerta
   * @param {*} alerta
   * @memberof MapaComponent
   */
  recibirAlerta(alerta) {

    this.alertaAviso = true;
    this.alertaMensaje = alerta;
    setTimeout(() => {
      this.alertaAviso = false
    }, 1000);
  }
  /**
   * Metodo que muestra una alerta en caso de que el array este vacio
   * @method recibirAlertaDos
   * @memberof MapaComponent
   */
  recibirAlertaDos() {
    if (this.marcadores.length == 0) {
      this.alertaAviso = true;
      this.alertaMensaje = "No existen puntos de referencia registrados con el filtro seleccionado"
      setTimeout(() => {
        this.alertaAviso = false
      }, 1000);
    }
  }
  /**
   * Metodo que permite borrar los marcadores que se han colocado en el mapa.
   * @method borrarMarkers
   * @memberof MapaComponent
   */
  borrarMarkers() {

    if (this.layerGroup) {
      this.map.removeLayer(this.layerGroup);
      this.marcadores = [];
    }
  }
  /**
   * Muestra al usuario un Popup al usuario cuando hace click sobre un punto determinado
   * @method mapClick
   * @param {*} e
   * @memberof MapaComponent
   */
  mapClick(e) {
  
    let mar= L.marker([e.latlng.lat, e.latlng.lng],
      { icon: this.icon }).
      bindPopup('<strong>Nombre del punto de referencia <br>' +  + '<br>Coordenadas</strong> <br> LON:'
        + e.latlng.lng + '<br>' + 'LAT:' + e.latlng.lat).
      addTo(this.map).
      openPopup();

  }

}


