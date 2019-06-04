import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    nombre: string;
    apellido: string;
    nivel_admin: boolean;

    constructor() {
        let item = JSON.parse(localStorage.getItem('isLoggedin'));
        this.nombre= item.nombre;
        this.apellido=item.apellido;
    }

    ngOnInit() {}

}
