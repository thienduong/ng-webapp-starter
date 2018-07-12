import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '../../common/index';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { MatFormFieldModule  } from '@angular/material';
import { MatRadioModule, MatCheckboxModule , MatTabsModule} from '@angular/material';
import { MatInputModule, MatTableModule, MatCardModule, MatProgressSpinnerModule, MatMenuModule,
  MatIconModule, MatToolbarModule, MatSelectModule, MatSortModule, MatPaginatorModule, MatProgressBarModule} from '@angular/material';
import {CdkTableModule } from '@angular/cdk/table';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from '../user-management/detail/detail.component';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

// import promiseButtons from 'ng-promise-buttons';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'detail/:id', component: UserDetailComponent},
  {path: '**', redirectTo: 'list'},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
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
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    NgxDnDModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTabsModule

    // promiseButtons


  ],
  declarations: [UserManagementComponent,
  UserDetailComponent],
  exports: [UserManagementComponent],
})
export class UserManagementModule { }
