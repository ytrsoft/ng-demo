import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core'
import { SharedModule } from '../../shared.module'

@Component({
  selector: 'app-lifecycle-child',
  imports: [
    SharedModule
  ],
  templateUrl: './lifecycle-child.component.html',
  styleUrl: './lifecycle-child.component.scss'
})
export class LifecycleChildComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  constructor() {
    this.log('constructor')
  }

  private log(method: string): void {
    console.log('子组件', `===${method}===`)
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

