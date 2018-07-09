import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {map, tap} from 'rxjs/operators';
import {Util} from '../util';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {AppConstant} from '../appConstant';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

@Injectable()
export class CustomHttpClient {
  public refreshTokenSubject: Subject<string>;

  constructor(private http: HttpClient,
              private _util: Util,
              private _router: Router) {

  }

  /**
   * GET request
   * @param {string} endPoint it doesn't need / in front of the end point
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.intercept<T>(this.http.get<T>(AppConstant.domain + endPoint, options));
  }

  /**
   * POST request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.intercept<T>(this.http.post<T>(AppConstant.domain + endPoint, params, options));
  }

  /**
   * PUT request
   * @param {string} endPoint end point of the api
   * @param {Object} params body of the request.
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
    return this.intercept<T>(this.http.put<T>(AppConstant.domain + endPoint, params, options));
  }

  /**
   * DELETE request
   * @param {string} endPoint end point of the api
   * @param {IRequestOptions} options options of the request like headers, body, etc.
   * @returns {Observable<T>}
   */
  public Delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.intercept<T>(this.http.delete<T>(AppConstant.domain + endPoint, options));
  }

  public intercept<T>(observable: Observable<T>): Observable<T> {
    return new Observable<T>(subscriber => {
      observable.subscribe(
        (data) => {
          // subscribe
          subscriber.next(data);
        },
        (err) => {
          // error
          if (err.status === 401) {
            if (!this.refreshTokenSubject) {
              this.refreshTokenSubject = new Subject<string>();
              this.refreshToken()
                .subscribe(token => {
                  this.refreshTokenSubject.next(token);
                }, (error) => {
                  console.log('refresh token failed', error);
                  // this._router.navigate(['/login']);
                });
            }

            this.refreshTokenSubject.subscribe(() => {
              this.intercept(observable)
                .subscribe(
                  (data) => subscriber.next(data),
                  (error) => subscriber.error(error),
                  () => subscriber.complete()
                );
            });
          }
          // subscriber.error(err);
        },
        () => {
          // complete
          subscriber.complete();
        }
      );
    });
  }

  public refreshToken() {
    const userToken = this._util.getToken();
    const refreshToken = userToken ? userToken.refreshToken : null;

    const httpParams = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);

    return this.http.get(`${AppConstant.domain}/api/auth`, {params: httpParams})
      .pipe(
        map((response: any) => response.data),
        tap((responseData: any) => {
          this._util.setToken(responseData.access_token, responseData.refresh_token);
        })
      );
  }
}
