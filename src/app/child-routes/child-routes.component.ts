import { Component } from '@angular/core';
import { RoutesModule } from '../routes.module';

@Component({
  selector: 'app-child-routes',
  imports: [
    RoutesModule
  ],
  templateUrl: './child-routes.component.html',
  styleUrl: './child-routes.component.scss'
})
export class ChildRoutesComponent {

}
