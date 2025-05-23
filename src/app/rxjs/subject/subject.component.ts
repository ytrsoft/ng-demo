import { Component } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-subject',
  imports: [
    SharedModule
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
/**
 * 可以接收订阅后的所有发射值
 */
export class SubjectComponent {

  subject = new Subject<number>()

  constructor() {
    this.subject.subscribe((value) => {
      alert('constructor@' + value)
    })
  }

  demo(): void {
    this.subject.next(1)
    this.subject.subscribe((value) => {
      alert('demo@' + value)
    })
    this.subject.next(2)
  }

}
