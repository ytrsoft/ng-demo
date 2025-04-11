import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { interval, Subscription } from 'rxjs'

@Component({
  selector: 'app-child',
  imports: [
    SharedModule
  ],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnDestroy {

  @Input() value!: number
  @Output() revc = new EventEmitter<number>()

  private sub!: Subscription

  ngOnInit() {
    this.sub = interval(1000).subscribe((val) => {
      this.revc.emit(val)
    })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

}
