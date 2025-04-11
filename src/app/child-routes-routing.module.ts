import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { C1Component } from './c1/c1.component'
import { C2Component } from './c2/c2.component'

const routes: Routes = [
  { path: '', redirectTo: 'c1', pathMatch: 'full' },
  { path: 'c1', component: C1Component },
  { path: 'c2', component: C2Component },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutesRoutingModule {}
