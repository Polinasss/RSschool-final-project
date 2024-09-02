import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('token') ?? '';

  const newReq = req.clone({
    setHeaders: { Authorization: token ? `Bearer ${token}` : '' },
  });

  return next(newReq);
};
