import { Component } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { of, throwError, timer, interval, Observable } from 'rxjs'
import { catchError, retry, tap, delay } from 'rxjs/operators'

@Component({
  selector: 'app-error-handling',
  imports: [SharedModule],
  templateUrl: './error-handling.component.html',
  styleUrl: './error-handling.component.scss'
})
export class ErrorHandlingComponent {
  ngOnInit() {
    this.useCatchError()
    this.useRetry()
    this.useRetryWithDelay()
  }

  // 捕获错误并提供替代值或新的Observable（保持不变）
  useCatchError() {
    const source$ = throwError(() => new Error('Something went wrong'))

    source$.pipe(
      catchError((error) => {
        console.log('捕获到错误:', error.message)
        return of('默认值')
      })
    ).subscribe((value) => {
      console.log('catchError结果:', value)
    })
  }

  // 基本重试逻辑（保持不变）
  useRetry() {
    let attempts = 0
    const source$ = interval(500).pipe(
      tap(() => {
        attempts++
        if (attempts < 3) {
          throw new Error(`测试错误 ${attempts}`)
        }
      }),
      retry(2) // 最多重试2次
    )

    source$.subscribe({
      next: (value) => console.log('retry成功:', value),
      error: (err) => console.log('retry最终错误:', err)
    })
  }

  // 使用新的retry配置替代retryWhen
  useRetryWithDelay() {
    const source$ = throwError(() => new Error('可重试错误'))

    source$.pipe(
      // 使用retry的delay配置替代retryWhen
      retry({
        count: 3, // 最大重试次数
        delay: (error, retryCount) => {
          console.log(`第${retryCount}次重试，错误:`, error.message)
          return timer(1000) // 延迟1秒重试
        }
      })
    ).subscribe({
      next: (value) => console.log('retryWithDelay成功:', value),
      error: (err) => console.log('retryWithDelay最终错误:', err.message)
    })

    // 更复杂的指数退避示例
    this.mockHttpRequest().pipe(
      retry({
        count: 4,
        delay: (error, retryCount) => {
          const delayTime = Math.pow(2, retryCount) * 1000 // 指数退避
          console.log(`请求失败，${delayTime/1000}秒后第${retryCount}次重试`)
          return timer(delayTime)
        }
      }),
      catchError((error) => {
        console.log('所有重试失败，返回降级数据')
        return of({ data: [], status: 'fallback' })
      })
    ).subscribe((response) => {
      console.log('最终结果:', response)
    })
  }

  // 模拟HTTP请求（保持不变）
  private mockHttpRequest() {
    let requestCount = 0
    return new Observable((observer) => {
      requestCount++
      if (requestCount < 3) {
        observer.error(new Error('服务器繁忙'))
      } else {
        observer.next({ data: [1, 2, 3], status: 'success' })
        observer.complete()
      }
    })
  }
}
