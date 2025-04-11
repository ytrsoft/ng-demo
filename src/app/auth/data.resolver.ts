import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { DataService } from './data.service'

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<any> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.getRoutes()
  }

  getRoutes(): Observable<any> {
    return this.dataService.getRoutes()
  }
}
