import { Component } from '@angular/core'
import {
  of, interval, timer, throwError, Subject, Observable
} from 'rxjs'
import {
  tap, delay, delayWhen, dematerialize, finalize,
  repeat, timeInterval, timeout, map, materialize,
  take, catchError,
  takeUntil
} from 'rxjs/operators'

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss']
})
export class UtilityComponent {
  private destroy$ = new Subject<void>()

  ngOnInit() {
    this.useTap()
    this.useDelay()
    this.useDelayWhen()
    this.useDematerialize()
    this.useFinalize()
    this.useRepeat()
    this.useTimeInterval()
    this.useTimeout()
    this.useToPromise()
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  // 执行副作用不影响流
  useTap() {
    of(1, 2, 3).pipe(
      tap({
        next: (val) => console.log('tap next:', val),
        error: (err) => console.log('tap error:', err),
        complete: () => console.log('tap complete')
      })
    ).subscribe()
  }

  // 延迟所有值的发出
  useDelay() {
    console.log('delay开始:', new Date().getSeconds())
    of(1, 2, 3).pipe(
      delay(1000),
      takeUntil(this.destroy$)
    ).subscribe((val) => {
      console.log('delay收到:', val, '时间:', new Date().getSeconds())
    })
  }

  // 为每个值自定义延迟
  useDelayWhen() {
    of('A', 'B', 'C').pipe(
      delayWhen((val) => timer(val.charCodeAt(0) * 10)),
      takeUntil(this.destroy$)
    ).subscribe((val) => console.log('delayWhen:', val))
  }

  // 将Notification对象转换回正常值
  useDematerialize() {
    of(1, 2, 3).pipe(
      materialize(),
      dematerialize(),
      takeUntil(this.destroy$)
    ).subscribe((val) => console.log('dematerialize:', val))
  }

  // 完成或出错时的清理逻辑
  useFinalize() {
    interval(500).pipe(
      take(3),
      finalize(() => console.log('finalize: 清理资源'))
    ).subscribe((val) => console.log('finalize示例:', val))
  }

  // 重复订阅源Observable
  useRepeat() {
    of(1, 2, 3).pipe(
      repeat(2)
    ).subscribe((val) => console.log('repeat:', val))
  }

  // 记录值与发出间隔时间
  useTimeInterval() {
    interval(1000).pipe(
      take(3),
      timeInterval()
    ).subscribe((val) => {
      console.log(`值: ${val.value}, 间隔: ${val.interval}ms`)
    })
  }

  // 设置超时限制
  useTimeout() {
    const slow$ = timer(2000).pipe(map(() => '慢响应'))

    slow$.pipe(
      timeout(1000),
      catchError((err) => of('超时处理'))
    ).subscribe((val) => console.log('timeout:', val))
  }

  // 将Observable转为Promise
  async useToPromise() {
    const value = await of(42).pipe(
      delay(1000)
    ).toPromise()

    console.log('toPromise:', value)
  }

  // 替代已弃用的timeoutWith
  useTimeoutWithAlternative() {
    const source$ = timer(2000)
    const fallback$ = of('备用值')

    source$.pipe(
      timeout({
        each: 1000,
        with: () => fallback$
      })
    ).subscribe((val) => console.log('timeout替代方案:', val))
  }

  // 替代已弃用的let
  useLetAlternative() {
    const customOperator = (source: Observable<number>) =>
      source.pipe(map(x => x * 2))

    of(1, 2, 3).pipe(
      customOperator
    ).subscribe((val) => console.log('let替代方案:', val))
  }

  // 替代已弃用的repeatWhen
  useRepeatWhenAlternative() {
    const condition$ = new Subject<void>()

    of(1).pipe(
      tap(() => console.log('触发值发射')),
      repeat({
        delay: (count) => {
          console.log(`已完成 ${count} 次`)
          return condition$ // 返回一个Observable作为延迟控制
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (val) => {
        console.log('收到值:', val)
        // 模拟条件触发
        setTimeout(() => condition$.next(), 1000)
      },
      complete: () => console.log('完成')
    })
  }
}
