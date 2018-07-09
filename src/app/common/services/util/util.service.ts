import {
  Injectable
} from '@angular/core';

import {
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';
import {UserToken} from '@common/models/UserToken';

@Injectable()
export class Util {

  constructor(private localStorageService: LocalStorageService) {
  }

  public getFullRoutePath(suffix, route: ActivatedRouteSnapshot) {
    if (route.routeConfig && route.routeConfig.path) { // If the path not empty
      suffix = `${route.routeConfig.path}/${suffix}`;
    }
    if (route.parent) { // If it still has parent
      return this.getFullRoutePath(suffix, route.parent);
    }
    return '/' + suffix;
  }

  public getFullRoutePathByActivatedRoute(suffix, route: ActivatedRoute) {
    if (route.routeConfig && route.routeConfig.path) { // If the path not empty
      suffix = `${route.routeConfig.path}/${suffix}`;
    }
    if (route.parent) { // If it still has parent
      return this.getFullRoutePathByActivatedRoute(suffix, route.parent);
    }
    return '/' + suffix;
  }

  public getLastActivatedRoute(route: ActivatedRoute) {
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }

  public getToken() {
    let userToken = this.localStorageService.get('userToken') as UserToken;

    if (!userToken) {
      userToken = new UserToken();
    }
    return userToken;
  }

  public setToken(access_token, refresh_token) {
    const userToken = new UserToken();
    userToken.accessToken = access_token;
    userToken.refreshToken = refresh_token;

    this.localStorageService.set('userToken', userToken);
  }

  public clearToken() {
    this.localStorageService.remove('userToken');
  }
}
