import { Component } from '@angular/core'
import { SharedModule } from '../shared.module'
@Component({
  selector: 'app-echarts',
  imports: [
    SharedModule
  ],
  templateUrl: './echarts.component.html',
  styleUrl: './echarts.component.scss'
})
export class EchartsComponent {
  chartOption = {
    title: {
      text: 'ECharts 示例'
    },
    tooltip: {},
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20, 30]
    }]
  }
}
