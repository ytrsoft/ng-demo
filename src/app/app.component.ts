import { Component } from '@angular/core';
import { SharedModule } from './shared.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  imports: [
    AppModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  links: any[] = [
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
