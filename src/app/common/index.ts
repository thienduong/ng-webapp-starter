import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SHARED_SERVICES } from './services';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouteCachingModule } from '@modules/route-caching';
import { PromiseButtonModule } from '@modules/promise-button/promise-button.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FuseSharedModule,
    RouteCachingModule,
    PromiseButtonModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FuseSharedModule,
    RouteCachingModule,
    PromiseButtonModule
  ],
  providers: [
    ...SHARED_SERVICES
  ]
})
export class AppSharedModule {
}
