import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CapitalizePipe } from './capitalize.pipe'
import { DataChartComponent } from './data-chart/data-chart.component'
import { HoverDirective } from './hover.directive'
import { MyInputComponent } from './my-input/my-input.component'

// ​declarations​
// 放组件/指令/管道
// 只能属于一个模块
// ​imports​
// 导入其他模块
// 比如 CommonModule、FormsModule
// ​exports​
// 暴露组件/指令/管道
// 给其他模块用
// ​providers​
// 注册服务
// 全应用单例（除非惰性加载）
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
  ]
})
export class SharedModule { }
