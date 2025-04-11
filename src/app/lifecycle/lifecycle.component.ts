import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'
import { LifecycleChildComponent } from './lifecycle-child/lifecycle-child.component'

@Component({
  selector: 'app-lifecycle',
  imports: [
    LifecycleChildComponent
  ],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.scss'
})
export class LifecycleComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor() {
    this.log('constructor')
  }

  private log(method: string): void {
    console.log('父组件', `===${method}===`)
  }

  ngOnChanges(): void {
    this.log('ngOnChanges')
  }

  ngOnInit(): void {
    this.log('constructor')
  }

  ngAfterContentInit(): void {
    this.log('ngAfterContentInit')
  }

  ngAfterContentChecked(): void {
    this.log('ngAfterContentChecked')
  }

  ngAfterViewInit(): void {
    this.log('ngAfterViewInit')
  }

  ngAfterViewChecked(): void {
    this.log('ngAfterViewChecked')
  }

  ngOnDestroy(): void {
    this.log('ngOnDestroy')
  }

}

