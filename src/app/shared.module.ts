import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { CapitalizePipe } from './capitalize.pipe'
import { DataChartComponent } from './data-chart/data-chart.component'
import { HoverDirective } from './hover.directive'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HoverDirective,
    CapitalizePipe,
    DataChartComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HoverDirective,
    CapitalizePipe,
    DataChartComponent
  ],
  providers: [provideHttpClient()]
})
export class SharedModule { }
