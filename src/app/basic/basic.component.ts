import { Component, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } from '@angular/core';
import { SharedModule } from '../shared.module';
import { CapitalizePipe } from '../capitalize.pipe';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-basic',
  imports: [
    SharedModule,
    CapitalizePipe,
    ChildComponent
  ],
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  public author = 'iceman';
  public total = 0;

  constructor() {
    console.log('构造函数：组件正在创建');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges：输入属性发生变化', changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit：组件已初始化');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck：变更检测周期正在运行');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit：内容已投影到组件中');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked：投影内容已检查');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit：组件视图和子视图已初始化');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked：组件视图和子视图已检查');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy：组件正在销毁');
  }

  onClick() {
    this.total++;
    console.log('总数已增加：', this.total);
  }

  onMessage(msg: number) {
    console.log('子组件消息：', msg);
  }
}
