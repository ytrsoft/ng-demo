import { Component } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-behavior',
  imports: [
    SharedModule
  ],
  templateUrl: './behavior-subject.component.html',
  styleUrl: './behavior-subject.component.scss'
})
/**
 * 推送最新值给所有已订阅者
 */
export class BehaviorSubjectComponent {

  subject = new BehaviorSubject<number>(0)

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
