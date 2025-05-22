import { Component, OnInit } from '@angular/core'
import { SharedModule } from '../shared.module'
import { RoutesModule } from '../routes.module'

@Component({
  selector: 'app-rxjs',
  imports: [
    RoutesModule,
    SharedModule
  ],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
  standalone: true
})
export class RxjsComponent implements OnInit {

  ngOnInit() {
    console.log('hello rxjs')
  }

}
