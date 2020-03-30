import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class WinAuth implements HttpInterceptor {
    constructor(){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
          headers: new HttpHeaders({
            'withCredentials': 'true',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
          })
        })
  
        
        //request = request.clone({
          //headers: new HttpHeaders({
            //'withCredentials': 'true',
            //'Content-Type':  'application/json',
            //'xh':'true'
          //})
        //});
        request = request.clone({
          withCredentials: true
        });
        return next.handle(request);
      }
}
