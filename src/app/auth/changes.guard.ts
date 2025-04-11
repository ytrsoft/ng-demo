import { Injectable } from '@angular/core'
import { CanDeactivate } from '@angular/router'
import { BasicComponent } from '../basic/basic.component'


@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<BasicComponent> {

  canDeactivate(component: BasicComponent): boolean {
    console.log('当前值', component.total)
    return true
  }
}
