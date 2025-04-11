import { Injectable } from '@angular/core'
import { Observable, timer } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  links = [
    { id: 0, label: '基础', url: '/' },
    { id: 1, label: '生命周期', url: '/life' },
    { id: 1, label: '子路由', url: '/routes' },
    { id: 1, label: '表单', url: '/form' },
    { id: 2, label: 'RXJS', url: '/rxjs' },
    { id: 3, label: 'Echarts', url: '/echarts' }
  ]

  getRoutes(): Observable<any> {

    return timer(500).pipe(
      map(() => {
        return this.links
      })
    )
  }
}
