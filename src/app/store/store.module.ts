import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'environments/environment';
import { AppStoreService } from './store.service';
import { metaReducers, AppReducers } from '@store/store.reducers';
import { CustomSerializer } from '@store/router/router.reducers';
import { effects } from '@store/store.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(AppReducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    AppStoreService
  ]
})

export class AppStoreModule {
}
