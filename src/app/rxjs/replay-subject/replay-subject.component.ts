import { Component } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { ReplaySubject } from 'rxjs'

@Component({
  selector: 'app-replay',
  imports: [
    SharedModule
  ],
  templateUrl: './replay-subject.component.html',
  styleUrl: './replay-subject.component.scss'
})
/**
 * 推送指定数量的历史值给新订阅者
 */
export class ReplaySubjectComponent {

  subject = new ReplaySubject<number>(1)

  constructor() {
    this.subject.subscribe((value) => {
      alert('constructor@' + value)
    })
  }

  demo(): void {
    this.subject.next(1)
    this.subject.next(2)
    this.subject.next(3)
    this.subject.subscribe((value) => {
      alert('demo@' + value)
    })
    this.subject.next(4)
  }

}
