import { Component } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [
    SharedModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  loginForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('登录成功', this.loginForm.value)
    } else {
      console.log('表单无效')
      // 触发验证
      this.loginForm.markAllAsTouched()
    }
  }
}
