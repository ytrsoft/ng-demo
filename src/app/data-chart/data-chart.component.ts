import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, HostListener } from '@angular/core'
import * as echarts from 'echarts'

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss']
})
export class DataChartComponent implements OnInit, OnDestroy {
  @Input() chartOption: any
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef
  private chart: any

  ngOnInit(): void {
    this.initializeChart()
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  private initializeChart(): void {
    this.chart = echarts.init(this.chartContainer.nativeElement)
    this.setChartOption()
  }

  private setChartOption(): void {
    if (this.chartOption) {
      this.chart.setOption(this.chartOption)
    } else {
      console.error('chartOption is required')
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (this.chart) {
      this.chart.resize()
    }
  }
}
