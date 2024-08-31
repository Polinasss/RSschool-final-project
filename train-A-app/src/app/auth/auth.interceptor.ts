import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('token') ?? '';

  const newReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      })
    : req;

  return next(newReq);
};
