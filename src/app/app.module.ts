import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { AppRoutingModule } from './app-routing.module'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { ProjectModule } from './project/project.module'
import { SharedModule } from './shared/shared.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { AuthModule } from './auth/auth.module'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { reducers, metaReducers } from './store'
import { EffectsModule } from '@ngrx/effects'
import { environment } from 'src/environments/environment'
import { CustomSerializer } from './store/custom-route-serializer'
import { StoreRouterConnectingModule } from '@ngrx/router-store'

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    ProjectModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: 'router', serializer: CustomSerializer }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // // Diagnostic only: inspect router configuration
  // constructor(router: Router) {
  //   // Use a custom replacer to display function names in the route configs
  //   const replacer = (key, value) => (typeof value === 'function' ? value.name : value)
  //   console.log('Routes: ', JSON.stringify(router.config, replacer, 2))
  // }
}
