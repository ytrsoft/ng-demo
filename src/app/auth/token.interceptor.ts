import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log('===loggingInterceptor===', req)
  return next(req)
}
