import { Component, OnInit } from '@angular/core'
import { SharedModule } from '../shared.module'
import { ChildComponent } from './child/child.component'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-basic',
  imports: [
    SharedModule,
    ChildComponent
  ],
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  public total = 0
  public fontColor = '#000'

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('snapshot data', this.route.snapshot.data)
  }

  onClick2(value: any): void {
    if (!isNaN(value)) {
      this.total = Number(value)
    }
  }

  onClick(): void {
    this.total++
    if (this.total > 3) {
      this.fontColor = '#FF4D4F'
    }
  }

  onMessage(msg: number) {
    console.log('子组件消息：', msg)
  }
}
