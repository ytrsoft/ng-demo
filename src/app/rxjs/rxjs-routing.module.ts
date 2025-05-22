import { Routes } from '@angular/router'
import { SubjectComponent } from './subject/subject.component'
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component'
import { ReplaySubjectComponent } from './replay-subject/replay-subject.component'
import { AsyncSubjectComponent } from './async-subject/async-subject.component'
import { CombinationComponent } from './combination/combination.component'
import { ConditionalComponent } from './conditional/conditional.component'

export const RxjsRoutingModule: Routes = [
  {
    path: '',
    component: SubjectComponent,
  },
  {
    path: 'behavior-subject',
    component: BehaviorSubjectComponent,
  },
  {
    path: 'replay-subject',
    component: ReplaySubjectComponent,
  },
  {
    path: 'async-subject',
    component: AsyncSubjectComponent,
  },
  {
    path: 'combination',
    component: CombinationComponent,
  },
  {
    path: 'conditional',
    component: ConditionalComponent,
  },
  { path: '**', redirectTo: '' }
]
