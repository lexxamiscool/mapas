import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormModule } from '../layout/form/form.module';

@NgModule({
    imports: [CommonModule, LoginRoutingModule,ReactiveFormsModule, FormsModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
