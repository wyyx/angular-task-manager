import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { LoginRoutingModule } from './login-routing.module'
import { RegisterComponent } from './register/register.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
	imports: [ CommonModule, SharedModule, LoginRoutingModule ],
	declarations: [ LoginComponent, RegisterComponent ]
})
export class LoginModule {}
