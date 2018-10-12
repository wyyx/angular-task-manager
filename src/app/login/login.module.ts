import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { LoginRoutingModule } from './login-routing.module'
import { MyCustomMaterialModule } from '../my-custom-material/my-custom-material.module'

@NgModule({
	imports: [ CommonModule, MyCustomMaterialModule, LoginRoutingModule ],
	declarations: [ LoginComponent ]
})
export class LoginModule {}
