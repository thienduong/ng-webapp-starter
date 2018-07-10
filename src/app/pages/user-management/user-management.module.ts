import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '../../common/index';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';

@NgModule({
  imports: [
    AppSharedModule,
    UserManagementRoutingModule,
    TranslateModule
  ],
  declarations: [UserManagementComponent],
  exports: [UserManagementComponent],
})
export class UserManagementModule { }
