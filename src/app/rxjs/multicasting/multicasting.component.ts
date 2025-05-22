import { Component } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { interval, Subject, connectable } from 'rxjs'
import { take, tap, share, shareReplay } from 'rxjs/operators'

@Component({
  selector: 'app-multicasting',
  imports: [SharedModule],
  templateUrl: './multicasting.component.html',
  styleUrl: './multicasting.component.scss'
})
export class MulticastingComponent {
  ngOnInit() {
    this.useConnectable()
    this.useShare()
    this.useShareReplay()
  }

  // 使用现代 connectable API 替代 publish/multicast
  useConnectable() {
    const source$ = interval(1000).pipe(
      take(3),
      tap((x) => console.log('connectable 源发出:', x))
    )

    // 使用 connectable 工厂函数
    const connectable$ = connectable(source$, {
      connector: () => new Subject<number>()
    })

    // 手动控制连接
    const connection = connectable$.connect()

    connectable$.subscribe((x) => console.log('connectable 订阅者A:', x))
    connectable$.subscribe((x) => console.log('connectable 订阅者B:', x))

    // 记得在适当时候取消订阅
    setTimeout(() => connection.unsubscribe(), 4000)
  }

  // 使用 share 自动管理多播（推荐简单场景）
  useShare() {
    const source$ = interval(1000).pipe(
      take(3),
      tap((x) => console.log('share 源发出:', x)),
      share() // 自动管理连接
    )

    source$.subscribe((x) => console.log('share 订阅者A:', x))
    source$.subscribe((x) => console.log('share 订阅者B:', x))
  }

  // 使用 shareReplay 缓存最新值
  useShareReplay() {
    const source$ = interval(1000).pipe(
      take(3),
      tap((x) => console.log('shareReplay 源发出:', x)),
      shareReplay({ bufferSize: 1, refCount: true }) // 缓存1个最新值
    )

    // 第一个订阅者
    source$.subscribe((x) => console.log('shareReplay 订阅者A:', x))

    // 延迟的第二个订阅者会收到最后一个值
    setTimeout(() => {
      source$.subscribe((x) => console.log('shareReplay 订阅者B:', x))
    }, 2500)
  }
}
