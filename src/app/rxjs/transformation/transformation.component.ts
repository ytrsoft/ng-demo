import { Component } from '@angular/core'
import {
  of, interval, timer, fromEvent, Subject, Observable,
  EMPTY
} from 'rxjs'
import {
  buffer, bufferCount, bufferTime, bufferToggle, bufferWhen,
  concatMap, exhaustMap, expand, groupBy, map,
  mergeMap, mergeScan, reduce, scan,
  switchMap, toArray, window, windowCount, windowTime,
  windowToggle, windowWhen, take, takeUntil, filter
} from 'rxjs/operators'

@Component({
  selector: 'app-transformation',
  templateUrl: './transformation.component.html',
  styleUrls: ['./transformation.component.scss']
})
export class TransformationComponent {
  private destroy$ = new Subject<void>()

  ngOnInit() {
    this.useBuffer()
    this.useBufferCount()
    this.useBufferTime()
    this.useBufferToggle()
    this.useBufferWhen()
    this.useConcatMap()
    this.useConcatMapTo()
    this.useExhaustMap()
    this.useExpand()
    this.useGroupBy()
    this.useMap()
    this.useMapTo()
    this.useMergeMap()
    this.useMergeScan()
    this.usePartition()
    this.usePluck()
    this.useReduce()
    this.useScan()
    this.useSwitchMap()
    this.useSwitchMapTo()
    this.useToArray()
    this.useWindow()
    this.useWindowCount()
    this.useWindowTime()
    this.useWindowToggle()
    this.useWindowWhen()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  // 缓冲源值直到closingNotifier发出
  useBuffer() {
    const source$ = interval(100)
    const closingNotifier$ = interval(500)

    source$.pipe(
      buffer(closingNotifier$),
      take(3),
      takeUntil(this.destroy$)
    ).subscribe((val) => console.log('buffer:', val))
  }

  // 缓冲指定数量的源值
  useBufferCount() {
    interval(100).pipe(
      bufferCount(3),
      take(3)
    ).subscribe((val) => console.log('bufferCount:', val))
  }

  // 缓冲源值指定时间
  useBufferTime() {
    interval(100).pipe(
      bufferTime(500),
      take(3)
    ).subscribe((val) => console.log('bufferTime:', val))
  }

  // 根据开关Observable缓冲值
  useBufferToggle() {
    const openings$ = interval(400)
    const closingSelector = () => timer(300)

    interval(100).pipe(
      bufferToggle(openings$, closingSelector),
      take(3)
    ).subscribe((val) => console.log('bufferToggle:', val))
  }

  // 自定义缓冲策略
  useBufferWhen() {
    interval(100).pipe(
      bufferWhen(() => timer(0, 500)),
      take(3)
    ).subscribe((val) => console.log('bufferWhen:', val))
  }

  // 顺序执行内部Observable
  useConcatMap() {
    of(1, 2, 3).pipe(
      concatMap((val) => timer(100).pipe(map(() => val))),
      takeUntil(this.destroy$)
    ).subscribe((val) => console.log('concatMap:', val))
  }

  // 映射到固定Observable并顺序执行
  useConcatMapTo() {
    of(1, 2, 3).pipe(
      concatMap(() => timer(100).pipe(map(() => 'x'))),
      take(3)
    ).subscribe((val) => console.log('concatMapTo:', val))
  }

  // 忽略新值直到当前Observable完成
  useExhaustMap() {
    fromEvent(document, 'click').pipe(
      exhaustMap(() => timer(1000).pipe(map(() => 'Clicked!'))),
      takeUntil(this.destroy$)
    ).subscribe((val) => console.log('exhaustMap:', val))
  }

  // 递归扩展Observable
  useExpand() {
    of(1).pipe(
      expand((val) => val < 8 ? of(val * 2) : EMPTY),
      takeUntil(this.destroy$)
    ).subscribe((val) => console.log('expand:', val))
  }

  // 按key分组
  useGroupBy() {
    of(
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 1, name: 'C' }
    ).pipe(
      groupBy((item) => item.id),
      mergeMap((group) => group.pipe(toArray()))
    ).subscribe((val) => console.log('groupBy:', val))
  }

  // 值转换
  useMap() {
    of(1, 2, 3).pipe(
      map((val) => val * 2)
    ).subscribe((val) => console.log('map:', val))
  }

  // 映射为固定值
  useMapTo() {
    interval(500).pipe(
      map(() => 'x'),
      take(3)
    ).subscribe((val) => console.log('mapTo:', val))
  }

  // 合并Observable（别名flatMap）
  useMergeMap() {
    of(1, 2, 3).pipe(
      mergeMap((val) => of(val, val * 2))
    ).subscribe((val) => console.log('mergeMap:', val))
  }

  // 带累加器的mergeMap
  useMergeScan() {
    of(1, 2, 3).pipe(
      mergeScan((acc, val) => of(acc + val), 0)
    ).subscribe((val) => console.log('mergeScan:', val))
  }

  // 分流为两个Observable
  usePartition() {
    const source$ = of(1, 2, 3, 4, 5, 6)
    const partition = <T>(source: Observable<T>, predicate: (value: T) => boolean) => {
      return [
        source.pipe(filter(predicate)),
        source.pipe(filter((val) => !predicate(val)))
      ] as [Observable<T>, Observable<T>]
    }

    const [evens2$, odds2$] = partition(source$, (val) => val % 2 === 0)
    evens2$.subscribe((val) => console.log('方案2 偶数:', val))
    odds2$.subscribe((val) => console.log('方案2 奇数:', val))
  }

  // 提取对象属性
  usePluck() {
    of(
      { name: 'A', value: 1 },
      { name: 'B', value: 2 }
    ).pipe(
      map((item) => item.name)
    ).subscribe((val) => console.log('pluck:', val))
  }

  // 归约计算（需complete）
  useReduce() {
    of(1, 2, 3).pipe(
      reduce((acc, val) => acc + val, 0)
    ).subscribe((val) => console.log('reduce:', val))
  }

  // 带累加器的流
  useScan() {
    of(1, 2, 3).pipe(
      scan((acc, val) => acc + val, 0)
    ).subscribe((val) => console.log('scan:', val))
  }

  // 切换最新Observable
  useSwitchMap() {
    fromEvent(document, 'click').pipe(
      switchMap(() => timer(1000).pipe(map(() => 'Clicked!')))
    ).subscribe((val) => console.log('switchMap:', val))
  }

  // 切换到固定Observable
  useSwitchMapTo() {
    fromEvent(document, 'click').pipe(
      switchMap(() => timer(1000).pipe(map(() => 'Clicked!'))),
    ).subscribe((val) => console.log('switchMapTo:', val))
  }

  // 收集所有值为数组
  useToArray() {
    of(1, 2, 3).pipe(
      toArray()
    ).subscribe((val) => console.log('toArray:', val))
  }

  // 窗口操作符（类似buffer但返回Observable）
  useWindow() {
    const source$ = interval(100)
    const closingNotifier$ = interval(500)

    source$.pipe(
      window(closingNotifier$),
      take(3),
      mergeMap((val) => val.pipe(toArray()))
    ).subscribe((val) => console.log('window:', val))
  }

  // 按数量窗口
  useWindowCount() {
    interval(100).pipe(
      windowCount(3),
      take(3),
      mergeMap((val) => val.pipe(toArray()))
    ).subscribe((val) => console.log('windowCount:', val))
  }

  // 按时间窗口
  useWindowTime() {
    interval(100).pipe(
      windowTime(500),
      take(3),
      mergeMap((val) => val.pipe(toArray()))
    ).subscribe((val) => console.log('windowTime:', val))
  }

  // 自定义窗口开关
  useWindowToggle() {
    const openings$ = interval(400)
    const closingSelector = () => timer(300)

    interval(100).pipe(
      windowToggle(openings$, closingSelector),
      take(3),
      mergeMap((val) => val.pipe(toArray()))
    ).subscribe((val) => console.log('windowToggle:', val))
  }

  // 自定义窗口策略
  useWindowWhen() {
    interval(100).pipe(
      windowWhen(() => timer(0, 500)),
      take(3),
      mergeMap((val) => val.pipe(toArray()))
    ).subscribe((val) => console.log('windowWhen:', val))
  }
}
