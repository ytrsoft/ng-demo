import { Component, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, SimpleChanges } from '@angular/core'
import { SharedModule } from '../shared.module'
import { CapitalizePipe } from '../capitalize.pipe'
import { ChildComponent } from './child/child.component'

@Component({
  selector: 'app-basic',
  imports: [
    SharedModule,
    CapitalizePipe,
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
