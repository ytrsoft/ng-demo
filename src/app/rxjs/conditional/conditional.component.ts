import { Component } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { defaultIfEmpty, every, iif, sequenceEqual, of, EMPTY, interval, take } from 'rxjs'

@Component({
  selector: 'app-conditional',
  imports: [SharedModule],
  templateUrl: './conditional.component.html',
  styleUrl: './conditional.component.scss'
})
export class ConditionalComponent {
  ngOnInit() {
    this.useDefaultIfEmpty()
    this.useEvery()
    this.useIif()
    this.useSequenceEqual()
  }

  // 当源Observable为空时发出默认值
  useDefaultIfEmpty() {
    const empty$ = EMPTY
    empty$.pipe(
      defaultIfEmpty('默认值')
    ).subscribe((value) => {
      console.log('defaultIfEmpty:', value) // 输出：默认值
    })
  }

  // 检查源Observable的所有值是否都满足条件
  useEvery() {
    const source$ = of(2, 4, 6, 8)
    source$.pipe(
      every(x => x % 2 === 0)
    ).subscribe((allEven) => {
      console.log('every:', allEven) // 输出：true
    })
  }

  // 根据条件选择不同的Observable
  useIif() {
    const condition = true
    const true$ = of('条件为真')
    const false$ = of('条件为假')

    iif(() => condition, true$, false$).subscribe((value) => {
      console.log('iif:', value) // 输出：条件为真
    })
  }

  // 比较两个Observable的发射序列是否相同
  useSequenceEqual() {
    const source1$ = of(1, 2, 3)
    const source2$ = of(1, 2, 3)

    source1$.pipe(
      sequenceEqual(source2$)
    ).subscribe((equal) => {
      console.log('sequenceEqual:', equal) // 输出：true
    })

    // 不同序列的例子
    const source3$ = of(1, 2, 3)
    const source4$ = of(1, 2, 4)
    source3$.pipe(
      sequenceEqual(source4$)
    ).subscribe((equal) => {
      console.log('sequenceEqual不同序列:', equal) // 输出：false
    })
  }
}
