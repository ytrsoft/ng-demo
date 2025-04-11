import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  /**
   * Default
   * OnPush <ChangeDetectorRef>
   *  - detectChanges 立即更新
   *  - markForCheck 标记更新 下一次同ng一起更新
   */
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements AfterContentInit {

  @ContentChild('content') content!: ElementRef

  ngAfterContentInit(): void {
    console.log('@ContentChild', this.content.nativeElement)
  }
}
