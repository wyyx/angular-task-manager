import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { SharedModule } from '../shared/shared.module'
import { LoginRoutingModule } from './auth-routing.module'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { authFeatureEffects, authFeatureReducers } from './store'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    StoreModule.forFeature('auth', authFeatureReducers),
    EffectsModule.forFeature(authFeatureEffects)
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
