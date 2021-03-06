import { AuthService} from './auth';
import { AuthGuard } from './auth-guard';
import { Util } from './util';
import { AppConstant } from './appConstant';
import { CustomHttpClient } from './http';
import { Interceptors } from './interceptors';
import {UserManagementService} from '@services/user-management';

export const SHARED_SERVICES = [
  CustomHttpClient,
  AuthGuard,
  AuthService,
  UserManagementService,
  Util,
  AppConstant,
  ...Interceptors
];

export * from './auth';
export * from './auth-guard';
export * from './util';
export * from './appConstant';
export * from './http';
export * from './interceptors';
