import { NgModule } from '@angular/core'
import { SharedModule } from './shared.module'
import { RouterModule, RouterOutlet } from '@angular/router'

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    RouterOutlet
  ],
  exports: [
    SharedModule,
    RouterModule,
    RouterOutlet
  ]
})
export class AppModule { }
