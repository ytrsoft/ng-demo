import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule
    ],
    declarations: [],
    exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [provideHttpClient()]
})
export class SharedModule { }
