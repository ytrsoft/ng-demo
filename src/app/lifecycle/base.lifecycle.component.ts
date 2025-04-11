import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core'

@Component({
  template: ``
})
export abstract class BaseLifecycleComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  abstract getTag(): string

  constructor() {
    this.log('constructor')
  }

  private log(method: string): void {
    console.log(this.getTag(), `===${method}===`)
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
