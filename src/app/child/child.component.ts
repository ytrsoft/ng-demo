import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges } from '@angular/core';
import { SharedModule } from '../shared.module';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-child',
  imports: [
    SharedModule
  ],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() value!: number;
  @Output() revc = new EventEmitter<number>();

  private sub!: Subscription;

  constructor() {
    console.log('构造函数：子组件正在创建');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges：输入属性变化', changes);
  }

  ngOnInit() {
    console.log('ngOnInit：子组件已初始化');
    this.sub = interval(1000).subscribe((val) => {
      this.revc.emit(val);
      console.log('ngOnInit：发送的值', val);
    });
  }

  ngDoCheck(): void {
    console.log('ngDoCheck：子变更检测周期正在运行');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit：子内容已投影到组件中');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked：子投影内容已检查');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit：子组件视图和子视图已初始化');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked：子组件视图和子视图已检查');
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      console.log('ngOnDestroy：子订阅已取消');
    }
  }

}
