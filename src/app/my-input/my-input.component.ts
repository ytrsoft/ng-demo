import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-input',
  templateUrl: './my-input.component.html',
  styleUrls: ['./my-input.component.scss']
})
export class MyInputComponent {

  @Input() value: string = ''
  @Output() valueChange = new EventEmitter<string>()

  onInput(ev: InputEvent): void {
    const inputElement = ev.target as HTMLInputElement
    this.value = inputElement.value
    this.valueChange.emit(this.value)
  }
}
