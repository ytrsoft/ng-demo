import { Routes } from '@angular/router'
import { SubjectComponent } from './subject/subject.component'

export const RxjsRoutingModule: Routes = [
  {
    path: '',
    component: SubjectComponent,
  },
  { path: '**', redirectTo: '' }
]
