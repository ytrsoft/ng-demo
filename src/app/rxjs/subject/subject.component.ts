import { Component } from '@angular/core'
import { SharedModule } from '../../shared.module'

@Component({
  selector: 'app-subject',
  imports: [
    SharedModule
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  output = ''

  demo(): void {}
}
