import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Util} from '../util';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
  constructor(private _util: Util) {

  }

  public intercept(req: HttpRequest<any>,
                   next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._util.getToken();
    if (token.accessToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
