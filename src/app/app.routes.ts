import { Routes } from '@angular/router'
import { BasicComponent } from './basic/basic.component'
import { FormComponent } from './form/form.component'
import { RxjsComponent } from './rxjs/rxjs.component'
import { EchartsComponent } from './echarts/echarts.component'
import { LifecycleComponent } from './lifecycle/lifecycle.component'
import { ChildRoutesComponent } from './child-routes/child-routes.component'
import { DataResolver } from './auth/data.resolver'

export const routes: Routes = [
  {
    path: '',
    component: BasicComponent,
    resolve: {
      data: DataResolver
    }
  },
  { path: 'life', component: LifecycleComponent },
  {
    path: 'routes',
    component: ChildRoutesComponent,
    loadChildren: () => import('./child-routes-routing.module').then((m) => m.ChildRoutesRoutingModule),
  },
  { path: 'form', component: FormComponent },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'echarts', component: EchartsComponent },
  { path: '**', redirectTo: '' }
]
