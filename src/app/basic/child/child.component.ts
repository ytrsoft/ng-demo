import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { interval, Subscription } from 'rxjs'
import { CardComponent } from '../../card/card.component'

@Component({
  selector: 'app-child',
  imports: [
    SharedModule,
    CardComponent
  ],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnDestroy, OnChanges  {

  @Input() value!: number
  @Output() revc = new EventEmitter<number>()

  val = ''

  @ContentChild('body') body!: ElementRef

  private sub!: Subscription

  isMore = false

  ngOnInit() {
    // this.sub = interval(1000).subscribe((val) => {
    //  this.revc.emit(val)
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const values = [
      changes['value']['firstChange'],
      changes['value']['currentValue'],
      changes['value']['previousValue']
    ]
    if (values[1] >= 2) {
      this.isMore = true
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

}
