import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EstadosService } from './services/estados.service';
import { MunicipiosService } from './services/municipios.service';
import { ParroquiasService } from './services/parroquias.service';


@Component({
  selector: 'app-navbar-mapa',
  templateUrl: './navbar-mapa.component.html',
  styleUrls: ['./navbar-mapa.component.scss']
})


export class NavbarMapaComponent implements OnInit {
  estados: any
  municipios: any;
  parroquias: any
  seleccion: boolean
  sinSeleccion: boolean = true;
  estOpt: string = '';
  munOpt: string = '';
  parOpt: string = '';
  @Output() enviarDatos = new EventEmitter();
  @Output() mensajeAlerta = new EventEmitter();

  constructor(
    private estadoService: EstadosService,
    private municipioService: MunicipiosService,
    private parroquiaService: ParroquiasService
  ) {

  }

  ngOnInit() {
    this.states();

  }
  /**Metodo para recibir los estados
   * @method states
   * @memberof NavbarMapaComponent
   */
  states() {
    this.estadoService.estados().subscribe(
      (data: any) => {

        this.estados = data.data;
        this.seleccion = false;
      },
      err => {
        console.log("Error", err);
        this.seleccion = true;
      }
    );
  }
  /**
   * Metodo para recibir los municipios desde el servicio
   * @method mun
   * @param {*} idEstado
   * @memberof NavbarMapaComponent
   */
  mun(idEstado) {
    this.estOpt = idEstado;
    console.log("estado", this.estOpt);

    this.municipioService.municipio(idEstado).subscribe(
      (data: any) => {
        this.municipios = data.data;
        this.seleccion = false;
        // this.ward('00');
      },
      err => {
        console.log("err", err)
        this.seleccion = true;

      }
    );
  }
  /**
   * Metodo para recibir las parroquias desde el servicio
   * @method ward
   * @param {*} idMun
   * @memberof NavbarMapaComponent
   */
  ward(idMun) {

    this.munOpt = idMun;
    console.log("municipio", this.munOpt);

    this.parroquiaService.parroquias(this.estOpt, this.munOpt).subscribe(
      (data: any) => {
        this.parroquias = data.data;
        this.seleccion = false;
      },
      err => {
        console.log("esto es un error", err);
        this.seleccion = true

      }
    )
  }
  /**
   * Metodo para almacenar el id de la parroquia
   *
   * @param {*} parroquia
   * @memberof NavbarMapaComponent
   */
  wardId(parroquia) {
    this.parOpt = parroquia;
    console.log("id de parroquia", this.parOpt);
  }
  /**
   * Construcción del evento que va a enviar los datos al componente mapa.component.ts 
   *@method enviarEstadoMun
   *@memberof NavbarMapaComponent
   */
  enviaDatos() {
    if (this.estOpt === '' && this.munOpt === '' && this.parOpt === '') {
      this.alertaMensaje()
    } else {
      this.enviarDatos.emit({
        estado: this.estOpt,
        municipio: this.munOpt,
        parroquia: this.parOpt
      });
    }
  }
  /**
   *Metodo que permite enviar las alertas necesarias
   * @method alertaMensaje
   * @memberof NavbarMapaComponent
   */
  alertaMensaje() {
    var alertaMensaje = "Debe seleccionar como mínimo un filtro."
    this.mensajeAlerta.emit(alertaMensaje);
    
  }



}

