import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  /**
   * Default
   * OnPush - markForCheck
   */
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

}
