import {AuthGuard} from '@common/services';
import {UserManagementModule} from '@pages/user-management/user-management.module';

export const pageRoutes = [
  {
    canActivate: [AuthGuard],
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  {
    canActivate: [AuthGuard],
    path: 'user-management',
    loadChildren: './user-management/user-management.module#UserManagementModule',
  },
  {
    path: 'sign-in',
    loadChildren: './signin/signin.module#SigninModule',
  },
  {
    path: 'sign-in-2',
    loadChildren: './signin2/signin2.module#Signin2Module',
  },
  {
    path: 'sign-up',
    loadChildren: './signup/signup.module#SignupModule',
  },
  {
    path: 'sign-up-2',
    loadChildren: './signup2/signup2.module#Signup2Module',
  }
];

