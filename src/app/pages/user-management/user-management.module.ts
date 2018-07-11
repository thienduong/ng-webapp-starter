import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '../../common/index';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { MatFormFieldModule  } from '@angular/material';
import { MatInputModule, MatTableModule, MatCardModule, MatProgressSpinnerModule, MatMenuModule,
  MatIconModule, MatToolbarModule, MatButtonModule, MatSelectModule, MatSortModule, MatPaginatorModule, MatProgressBarModule} from '@angular/material';
import {CdkTableModule } from '@angular/cdk/table';



@NgModule({
  imports: [
    AppSharedModule,
    UserManagementRoutingModule,
    TranslateModule,
    MatFormFieldModule,
    CdkTableModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  declarations: [UserManagementComponent],
  exports: [UserManagementComponent],
})
export class UserManagementModule { }
