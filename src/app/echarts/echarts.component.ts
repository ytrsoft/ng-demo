import { Component } from '@angular/core';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-echarts',
  imports: [
    SharedModule
  ],
  templateUrl: './echarts.component.html',
  styleUrl: './echarts.component.scss'
})
export class EchartsComponent {

}
