import { Component } from '@angular/core';
import { SharedModule } from './shared.module';

@Component({
  selector: 'app-root',
  imports: [
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public links: any[] = [
    { label: '基础', url: '/basic' },
    { label: '表单', url: '/form' },
    { label: 'RXJS', url: '/rxjs' },
    { label: 'Echarts', url: '/echarts' }
  ]
}
