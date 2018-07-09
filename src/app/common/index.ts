import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SHARED_SERVICES } from './services';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouteCachingModule } from '@modules/route-caching';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FuseSharedModule,
    RouteCachingModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FuseSharedModule,
    RouteCachingModule,
  ],
  providers: [
    ...SHARED_SERVICES
  ]
})
export class AppSharedModule {
}
