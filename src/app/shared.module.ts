import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { CapitalizePipe } from './capitalize.pipe'
import { DataChartComponent } from './data-chart/data-chart.component'
import { HoverDirective } from './hover.directive'
import { MyInputComponent } from './my-input/my-input.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HoverDirective,
    CapitalizePipe,
    DataChartComponent,
    MyInputComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HoverDirective,
    CapitalizePipe,
    DataChartComponent,
    MyInputComponent
  ],
  providers: [provideHttpClient()]
})
export class SharedModule { }
