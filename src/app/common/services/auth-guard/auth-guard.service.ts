import {
  Injectable
} from '@angular/core';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import {
  AuthService
} from '../auth';
import { AppStoreService } from '@store/store.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
              private router: Router,
              private appStoreService: AppStoreService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const appState = this.appStoreService.getState();
    if (!appState.auth.isLoggedIn) {
      this.router.navigateByUrl('/sign-in-2');
      return false;
    }

    return true;
  }
}
