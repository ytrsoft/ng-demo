import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Observable } from 'rxjs'

type R<T> = Observable<T> | Promise<T> | T

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): R<boolean> {
    const isAuthenticated = false
    if (!isAuthenticated) {
      this.router.navigate(['/form'])
      return false
    }
    return true
  }
}
