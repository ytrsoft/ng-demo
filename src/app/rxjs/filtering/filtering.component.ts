import { Component } from '@angular/core'
import { of, interval, timer, fromEvent, Subject } from 'rxjs'
import {
  audit, auditTime, debounce, debounceTime, distinct, distinctUntilChanged,
  distinctUntilKeyChanged, filter, find, first, ignoreElements, last, sample,
  single, skip, skipUntil, skipWhile, take, takeLast, takeUntil, takeWhile,
  throttle, throttleTime, map
} from 'rxjs/operators'
import { SharedModule } from '../../shared.module'

@Component({
  selector: 'app-filtering',
  imports: [
    SharedModule
  ],
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.scss']
})
export class FilteringComponent {
  private destroy$ = new Subject<void>()

  ngOnInit() {
    this.useAudit()
    this.useAuditTime()
    this.useDebounce()
    this.useDebounceTime()
    this.useDistinct()
    this.useDistinctUntilChanged()
    this.useDistinctUntilKeyChanged()
    this.useFilter()
    this.useFind()
    this.useFirst()
    this.useIgnoreElements()
    this.useLast()
    this.useSample()
    this.useSingle()
    this.useSkip()
    this.useSkipUntil()
    this.useSkipWhile()
    this.useTake()
    this.useTakeLast()
    this.useTakeUntil()
    this.useTakeWhile()
    this.useThrottle()
    this.useThrottleTime()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  // 忽略指定时间内的值，只保留每个静默期后的第一个值
  useAudit() {
    const source$ = interval(500)
    source$.pipe(
      audit(() => interval(1000)), // 每秒最多发出一个值
      take(5)
    ).subscribe((value) => console.log('audit:', value))
  }

  // 忽略指定时间内的值，基于时间窗口
  useAuditTime() {
    fromEvent(document, 'click').pipe(
      auditTime(1000), // 每秒最多处理一次点击
      takeUntil(this.destroy$)
    ).subscribe(() => console.log('auditTime: clicked'))
  }

  // 根据另一个Observable决定何时发出值
  useDebounce() {
    const source$ = interval(300).pipe(take(10))
    source$.pipe(
      debounce((val) => timer(val % 2 === 0 ? 200 : 400))
    ).subscribe((value) => console.log('debounce:', value))
  }

  // 防抖操作，基于时间
  useDebounceTime() {
    const searchBox = document.querySelector('#rxjs-input') as HTMLInputElement
    fromEvent(searchBox, 'input').pipe(
      debounceTime(300),
      map((e: any) => e.target.value),
      takeUntil(this.destroy$)
    ).subscribe((value) => console.log('debounceTime:', value))
  }

  // 过滤重复值（全等比较）
  useDistinct() {
    of(1, 1, 2, 2, 3, 3).pipe(
      distinct()
    ).subscribe((value) => console.log('distinct:', value))
  }

  // 仅当当前值与前一个值不同时才发出
  useDistinctUntilChanged() {
    of(1, 1, 2, 2, 1, 1).pipe(
      distinctUntilChanged()
    ).subscribe((value) => console.log('distinctUntilChanged:', value))
  }

  // 比较对象特定属性的变化
  useDistinctUntilKeyChanged() {
    of(
      { id: 1, name: 'A' },
      { id: 1, name: 'B' },
      { id: 2, name: 'C' }
    ).pipe(
      distinctUntilKeyChanged('id')
    ).subscribe((value) => console.log('distinctUntilKeyChanged:', value))
  }

  // 基于条件过滤值
  useFilter() {
    interval(500).pipe(
      filter((val) => val % 2 === 0),
      take(5)
    ).subscribe((value) => console.log('filter:', value))
  }

  // 查找第一个满足条件的值
  useFind() {
    of(1, 2, 3, 4).pipe(
      find((val) => val > 2)
    ).subscribe((value) => console.log('find:', value))
  }

  // 发出第一个值（或第一个满足条件的值）
  useFirst() {
    of(1, 2, 3).pipe(
      first()
    ).subscribe((value) => console.log('first:', value))
  }

  // 忽略所有值，只关心complete/error
  useIgnoreElements() {
    of(1, 2, 3).pipe(
      ignoreElements()
    ).subscribe({
      complete: () => console.log('ignoreElements: complete')
    })
  }

  // 发出最后一个值（需等待complete）
  useLast() {
    of(1, 2, 3).pipe(
      last()
    ).subscribe((value) => console.log('last:', value))
  }

  // 定期采样Observable的值
  useSample() {
    interval(500).pipe(
      sample(interval(1000)),
      take(5)
    ).subscribe((value) => console.log('sample:', value))
  }

  // 确保源Observable只发出一个值
  useSingle() {
    of(1).pipe(
      single()
    ).subscribe((value) => console.log('single:', value))
  }

  // 跳过前N个值
  useSkip() {
    of(1, 2, 3, 4).pipe(
      skip(2)
    ).subscribe((value) => console.log('skip:', value))
  }

  // 跳过直到另一个Observable发出值
  useSkipUntil() {
    const source$ = interval(500)
    const trigger$ = timer(2000)
    source$.pipe(
      skipUntil(trigger$),
      take(5)
    ).subscribe((value) => console.log('skipUntil:', value))
  }

  // 跳过满足条件的值
  useSkipWhile() {
    of(1, 2, 3, 4, 1, 2).pipe(
      skipWhile((val) => val < 3)
    ).subscribe((value) => console.log('skipWhile:', value))
  }

  // 取前N个值
  useTake() {
    interval(500).pipe(
      take(3)
    ).subscribe((value) => console.log('take:', value))
  }

  // 取最后N个值（需等待complete）
  useTakeLast() {
    of(1, 2, 3, 4).pipe(
      takeLast(2)
    ).subscribe((value) => console.log('takeLast:', value))
  }

  // 取直到另一个Observable发出值
  useTakeUntil() {
    interval(500).pipe(
      takeUntil(this.destroy$)
    ).subscribe((value) => console.log('takeUntil:', value))
  }

  // 取满足条件的值
  useTakeWhile() {
    of(1, 2, 3, 4, 1, 2).pipe(
      takeWhile((val) => val < 4)
    ).subscribe((value) => console.log('takeWhile:', value))
  }

  // 根据另一个Observable节流
  useThrottle() {
    interval(500).pipe(
      throttle(() => interval(1000)),
      take(5)
    ).subscribe((value) => console.log('throttle:', value))
  }

  // 基于时间节流
  useThrottleTime() {
    fromEvent(document, 'scroll').pipe(
      throttleTime(300),
      takeUntil(this.destroy$)
    ).subscribe(() => console.log('throttleTime: scrolling'))
  }
}
