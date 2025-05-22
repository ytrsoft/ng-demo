import { Routes } from '@angular/router'
import { SubjectComponent } from './subject/subject.component'
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component'
import { ReplaySubjectComponent } from './replay-subject/replay-subject.component'
import { AsyncSubjectComponent } from './async-subject/async-subject.component'
import { CombinationComponent } from './combination/combination.component'
import { ConditionalComponent } from './conditional/conditional.component'
import { CreationComponent } from './creation/creation.component'
import { ErrorHandlingComponent } from './error-handling/error-handling.component'
import { MulticastingComponent } from './multicasting/multicasting.component'
import { FilteringComponent } from './filtering/filtering.component'
import { TransformationComponent } from './transformation/transformation.component'
import { UtilityComponent } from './utility/utility.component'

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
  {
    path: 'creation',
    component: CreationComponent,
  },
  {
    path: 'error-handling',
    component: ErrorHandlingComponent,
  },
  {
    path: 'multicasting',
    component: MulticastingComponent,
  },
  {
    path: 'filtering',
    component: FilteringComponent,
  },
  {
    path: 'transformation',
    component: TransformationComponent,
  },
  {
    path: 'utility',
    component: UtilityComponent,
  },
  { path: '**', redirectTo: '' }
]
