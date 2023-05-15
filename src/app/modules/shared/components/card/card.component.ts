import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() multiVerseId?: string = '';
  @Input() name: string = '';
  @Input() imageUrl? = '';
  @Input() imageAlt = '';
  @Input() manaCost: string = '';
  @Input() type: string = '';
  @Input() text: string = '';
}
