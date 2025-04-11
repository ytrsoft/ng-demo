import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { CapitalizePipe } from './capitalize.pipe'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CapitalizePipe
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizePipe
  ],
  providers: [provideHttpClient()]
})
export class SharedModule { }
