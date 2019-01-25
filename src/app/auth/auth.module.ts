import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { LoginRoutingModule } from './auth-routing.module'
import { RegisterComponent } from './register/register.component'
import { SharedModule } from '../shared/shared.module'
import { StoreModule } from '@ngrx/store'
import { authReducer } from './store/reducers/auth.reducer'
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './store/effects/auth.effects'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
