import { Component } from '@angular/core';
import { SharedModule } from './shared.module';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public links: any[] = [
    { label: '基础', url: '/' },
    { label: '表单', url: '/form' },
    { label: 'RXJS', url: '/rxjs' },
    { label: 'Echarts', url: '/echarts' }
  ]
}
