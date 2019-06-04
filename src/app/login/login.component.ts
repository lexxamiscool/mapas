/**
 * Login de la aplicación de los usuarios, permite el acceso de los usuarios a la aplicación
 * 
 * @class LoginComponent
 * @module {core,router,router.animations,form, ts-md5}
 * @package {core,router,router.animations,form, ts-md5}
 * @author Pablo Hernández <pablo.hernandez@sigis.com.ve>
 * @copyrigth (c) SIGIS Soluciones Integrales GIS, C.A.
 */


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from './login.service'
import { Validators, FormBuilder,FormControl, FormGroup } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorLogin = false;

    constructor(
        public router: Router,
        private loginService: LoginService,
        private formBuilder: FormBuilder
        ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username:(['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^[a-z]{3,}$')])]),
            password:(['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('[a-z0-9]+')])])
        });
    }

    /**
     * LogIn permite al usuario loguearse en la aplicación 
     * @method login
     * @param username 
     * @param password 
     */

    logIn(username: string, password: string){
        /**
         * Permite cifrar la clave en md5 para luego enviarla al servicio de base de datos
         * @var pass
         */
        var pass:any = Md5.hashStr(password);
        this.loginService.login(username, pass).subscribe(
            res =>{
                this.onLoggedIn(res);
                this.router.navigateByUrl('/dashboard');
                
            },
            error =>{
                this.errorLogin = true;

            },
            
        );
    }
    /**
     * Permite obtener la data que devuelve el servicio y pasarla a un archivo JSON
     * @method onLoggedIn
     * @param dato 
     */
    onLoggedIn(dato){
        /**
         * Almacena la data en un JSON
         * 
         * @let newData
         */
        let newData = {
            "nombre":dato.data.nombre,
            "apellido":dato.data.apellido,
            "nivel_admin": dato.data.nivel_admin
        }
        localStorage.setItem('isLoggedin', JSON.stringify(newData));
    }   
}
