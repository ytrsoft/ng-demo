import { Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { FormComponent } from './form/form.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { EchartsComponent } from './echarts/echarts.component';

export const routes: Routes = [
  { path: '', component: BasicComponent },
  { path: 'form', component: FormComponent },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'echarts', component: EchartsComponent },
  { path: '**', redirectTo: '' }
];
