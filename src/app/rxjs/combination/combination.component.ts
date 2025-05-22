import { Component, OnInit } from '@angular/core'
import { SharedModule } from '../../shared.module'
import {
  combineLatestAll, combineLatest, concat, concatAll, endWith, forkJoin,
  merge, mergeAll, pairwise, race, startWith, withLatestFrom, zip,
  of, interval, timer, take, map
} from 'rxjs'

@Component({
  selector: 'app-combination',
  imports: [SharedModule],
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.scss']
})
export class CombinationComponent implements OnInit {

  ngOnInit(): void {
    this.useCombineLatestAll()
    this.useCombineLatest()
    this.useConcat()
    this.useConcatAll()
    this.useEndWith()
    this.useForkJoin()
    this.useMerge()
    this.useMergeAll()
    this.usePairwise()
    this.useRace()
    this.useStartWith()
    this.useWithLatestFrom()
    this.useZip()
  }

  // 将高阶Observable转换为普通Observable
  // 使用combineLatest方式合并内部Observable的最新值
  useCombineLatestAll(): void {
    const source$ = of(
      interval(1000).pipe(take(2)),
      interval(1500).pipe(take(2))
    )
    source$.pipe(
      combineLatestAll()
    ).subscribe((value) => {
      // [0, 0]
      // [0, 1]
      // [1, 1]
      console.log('CombineLatestAll:', value)
    })
  }

  // 合并多个Observable，每当任意一个Observable发出新值时
  // 都使用所有Observable的最新值进行计算并发出结果
  useCombineLatest(): void {
    const source1$ = interval(1000).pipe(take(2))
    const source2$ = interval(1500).pipe(take(2))

    combineLatest([source1$, source2$]).subscribe((value) => {
      // [0, 0]
      // [0, 1]
      // [1, 1]
      console.log('CombineLatest:', value)
    })
  }

  // 按顺序连接多个Observable，前一个完成后才开始下一个
  // 保持严格的顺序执行
  useConcat(): void {
    const source1$ = of(1, 2, 3)
    const source2$ = of(4, 5, 6)

    concat(source1$, source2$).subscribe((value) => {
      // 1
      // 2
      // 3
      // 4
      // 5
      // 6
      console.log('Concat:', value)
    })
  }

  // 将高阶Observable转换为一阶Observable
  // 按顺序连接内部的所有Observable
  useConcatAll(): void {
    const source$ = of(of(1, 2), of(3, 4))
    source$.pipe(concatAll()).subscribe((value) => {
      // 1
      // 2
      // 3
      // 4
      console.log('ConcatAll:', value)
    })
  }

  // 在源Observable完成后附加一个指定的结束值
  // 类似于数组的push操作
  useEndWith(): void {
    of(1, 2, 3).pipe(
      endWith(99)
    ).subscribe((value) => {
      // 1
      // 2
      // 3
      // 99
      console.log('EndWith:', value)
    })
  }

  // 等待多个Observable都完成后
  // 将它们最后的值以数组形式一起发出
  useForkJoin(): void {
    const source1$ = of(1, 2, 3)
    const source2$ = of('a', 'b', 'c')

    forkJoin([source1$, source2$]).subscribe(([val1, val2]) => {
      console.log('ForkJoin:', val1, val2) // 3, 'c'
    })
  }

  // 将多个Observable合并为一个
  // 按照事件发生的时间顺序交错发出值
  useMerge(): void {
    const source1$ = interval(1000).pipe(take(3))
    const source2$ = interval(1500).pipe(take(3))

    merge(source1$, source2$).subscribe((value) => {
      // 0
      // 0
      // 1
      // 2
      // 1
      // 2
      console.log('Merge:', value)
    })
  }

  // 将高阶Observable转换为一阶Observable
  // 并发地合并内部的所有Observable
  useMergeAll(): void {
    const source$ = of(of(1, 2), of(3, 4))

    source$.pipe(mergeAll()).subscribe((value) => {
      // 1
      // 2
      // 3
      // 4
      console.log('MergeAll:', value)
    })
  }

  // 将源Observable的值两两配对
  // 每次发出前一个值和当前值组成的数组
  usePairwise(): void {
    of(1, 2, 3, 4).pipe(
      pairwise()
    ).subscribe(([prev, curr]) => {
      // [1, 2]
      // [2, 3]
      // [3, 4]
      console.log('Pairwise:', prev, curr)
    })
  }

  // 从多个Observable中采用第一个产生值的Observable
  // 其余Observable会被忽略
  useRace(): void {
    const source1$ = timer(1000).pipe(map(() => 'fast'))
    const source2$ = timer(2000).pipe(map(() => 'slow'))

    race(source1$, source2$).subscribe((value) => {
      // 'fast'
      console.log('Race:', value)
    })
  }

  // 在源Observable开始前先发出指定的初始值
  // 类似于数组的unshift操作
  useStartWith(): void {
    of(1, 2, 3).pipe(
      startWith(0)
    ).subscribe((value) => {
      // 0
      // 1
      // 2
      // 3
      console.log('StartWith:', value)
    })
  }

  // 当源Observable发出值时，结合另一个Observable的最新值
  // 一起发出计算结果
  useWithLatestFrom(): void {
    const source1$ = interval(1000).pipe(take(3))
    const source2$ = interval(1500).pipe(take(3))

    source1$.pipe(
      withLatestFrom(source2$)
    ).subscribe((value) => {
      // [0, 1]
      // [2, 1]
      console.log('WithLatestFrom:', value)
    })
  }

  // 严格按索引组合多个Observable的值
  // 每个Observable在同一索引位置的值会被组合在一起
  useZip(): void {
    const source1$ = of(1, 2, 3)
    const source2$ = of('a', 'b', 'c')

    zip(source1$, source2$).subscribe(([val1, val2]) => {
      // [1, 'a']
      // [2, 'b']
      // [3, 'c']
      console.log('Zip:', val1, val2)
    })
  }
}
