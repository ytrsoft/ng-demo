import { Component } from '@angular/core'
import { RoutesModule } from './routes.module'
import { DataService } from './auth/data.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  imports: [
    RoutesModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  name = 'angular'

  links$: Observable<any>

  constructor(private ps: DataService) {
    this.links$ = ps.getRoutes()
    ps.getToken().subscribe((token: string) => {
      console.log('token', token)
    })
  }

  trackById(index: number, item: any): number {
    return item.id
  }

}
