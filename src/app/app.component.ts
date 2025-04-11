import { Component } from '@angular/core'
import { RoutesModule } from './routes.module'
import { CapitalizePipe } from './capitalize.pipe'

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

  links = [
    { id: 0, label: '基础', url: '/' },
    { id: 1, label: '生命周期', url: '/life' },
    { id: 1, label: '表单', url: '/form' },
    { id: 2, label: 'RXJS', url: '/rxjs' },
    { id: 3, label: 'Echarts', url: '/echarts' }
  ]

  trackById(index: number, item: any): number {
    return item.id
  }

}
