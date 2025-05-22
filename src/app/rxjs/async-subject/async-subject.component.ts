import { Component } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { AsyncSubject } from 'rxjs'

@Component({
  selector: 'app-subject',
  imports: [
    SharedModule
  ],
  templateUrl: './async-subject.component.html',
  styleUrl: './async-subject.component.scss'
})
/**
 * 所有订阅者收到相同最终值
 */
export class AsyncSubjectComponent {

  subject = new AsyncSubject<number>()

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
    this.subject.complete()
  }

}
