import { Component } from '@angular/core'
import { SharedModule } from '../../shared.module'
import {
  Observable, defer, EMPTY, from, fromEvent, generate,
  interval, of, range, take, throwError, timer
} from 'rxjs'

import { ajax } from 'rxjs/ajax'

@Component({
  selector: 'app-creation',
  imports: [SharedModule],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.scss'
})
export class CreationComponent {
  ngOnInit() {
    // this.useAjax()
    // this.useCreate()
    // this.useDefer()
    // this.useEmpty()
    // this.useFrom()
    // this.useFromEvent()
    this.useGenerate()
    // this.useInterval()
    // this.useOf()
    // this.useRange()
    // this.useThrow()
    // this.useTimer()
  }

  // 创建AJAX请求的Observable
  useAjax() {
    ajax('https://jsonplaceholder.typicode.com/todos/1').subscribe((result: any) => {
      console.log('请求结果')
      console.log(JSON.stringify(JSON.parse(result.response), null, 2))
    })
  }

  // 自定义创建Observable
  useCreate() {
    const observable = new Observable((observer: any) => {
      observer.next(1)
      observer.next(2)
      observer.next(3)
      observer.complete()
    })

    observable.subscribe((value: any) => {
      // 1
      // 2
      // 3
      console.log('create:', value)
    })
  }

  // 延迟创建Observable直到有订阅
  useDefer() {
    const deferred$ = defer(() => {
      console.log('Defer creating observable')
      return of(1, 2, 3)
    })

    // 只有订阅时才会执行工厂函数
    deferred$.subscribe((value) => {
      // 1
      // 2
      // 3
      console.log('defer:', value)
    })
  }

  // 创建立即完成的空Observable
  useEmpty() {
    EMPTY.subscribe({
      next: (value) => console.log('empty next:', value),
      complete: () => console.log('empty complete') // 立即完成
    })
  }

  // 从数组、Promise等创建Observable
  useFrom() {
    // 从数组创建
    from([1, 2, 3]).subscribe((value) => {
      // 1
      // 2
      // 3
      console.log('from array:', value)
    })

    // 从Promise创建
    from(Promise.resolve([1, 2, 3])).subscribe((value) => {
      // [1, 2, 3]
      console.log('from promise:', value)
    })
  }

  // 从DOM事件创建Observable
  useFromEvent() {
    // 需要实际DOM元素，这里用document示例
    const clicks$ = fromEvent(document, 'click')
    clicks$.subscribe((event) => {
      console.log('fromEvent click:', event)
    })
  }

  // 生成序列值
  useGenerate() {
    const result$ = generate({
      initialState: 1,                  // 初始值
      condition: (x) => x < 5,          // 继续条件
      iterate: (x) => x + 1,            // 迭代函数
      resultSelector: (x: number) => x * 2      // 结果转换
    })

    result$.subscribe((value) => {
      // 2
      // 4
      // 6
      // 8
      console.log('generate:', value)
    })
  }

  // 按固定时间间隔发出连续数字
  useInterval() {
    interval(1000).pipe(
      take(3)                 // 限制只取前3个值
    ).subscribe((value) => {
      console.log('interval:', value) // 0, 1, 2 (每秒一个)
    })
  }

  // 创建发出指定参数的Observable
  useOf() {
    of('a', 'b', 'c').subscribe((value) => {
      console.log('of:', value) // a, b, c
    })
  }

  // 创建发出数字序列的Observable
  useRange() {
    range(5, 3).subscribe((value) => {  // 从5开始，发3个值
      console.log('range:', value) // 5, 6, 7
    })
  }

  // 创建立即抛出错误的Observable
  useThrow() {
    throwError(() => new Error('程序报错')).subscribe({
      error: (err) => console.log('error:', err.message) // 程序报错
    })
  }

  // 创建延迟后按间隔发出数字的Observable
  useTimer() {
    timer(2000, 1000).pipe(   // 2秒后开始，每秒发出一个值
      take(3)
    ).subscribe((value) => {
      console.log('timer:', value) // 0, 1, 2
    })
  }
}
