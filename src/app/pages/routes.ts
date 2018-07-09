import {AuthGuard} from '@common/services';

export const pageRoutes = [
  {
    canActivate: [AuthGuard],
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
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

