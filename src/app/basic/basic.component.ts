import { Component } from '@angular/core'
import { SharedModule } from '../shared.module'
import { ChildComponent } from './child/child.component'

@Component({
  selector: 'app-basic',
  imports: [
    SharedModule,
    ChildComponent
  ],
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {

  public total = 0
  public fontColor = '#000'

  onClick() {
    this.total++
    if (this.total > 3) {
      this.fontColor = '#FF4D4F'
    }
  }

  onMessage(msg: number) {
    console.log('子组件消息：', msg)
  }
}
