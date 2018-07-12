import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppStoreModule } from '@store/store.module';
import { ToastrModule } from 'ngx-toastr';
import { appRoutes } from './routes';
import { PageModule } from './pages';
import { AppComponent } from './app.component';
import { AppSharedModule } from './common';
import { AppModule as FuseAppModule } from './themes/app/app.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FuseAppModule,
    TranslateModule.forRoot(),
    AppStoreModule,
    AppSharedModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    PageModule,
    MatIconModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
  bootstrap: [AppComponent]
})
export class AppMainModule {
}
