import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapaRoutingModule } from './mapa-routing.module';
import { MapaComponent } from './mapa.component';
import { NavbarMapaComponent } from './navbar-mapa/navbar-mapa/navbar-mapa.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MapaRoutingModule,
    FormsModule
  ],
  declarations: [MapaComponent, NavbarMapaComponent]
})
export class MapaModule { }
