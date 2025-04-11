import { Component } from '@angular/core';
import { SharedModule } from '../shared.module';
import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: 'app-basic',
  imports: [
    SharedModule,
    CapitalizePipe
  ],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.scss'
})
export class BasicComponent {

  public author = 'iceman'
  public total = 0

  onClick() {
    this.total++
  }
}
