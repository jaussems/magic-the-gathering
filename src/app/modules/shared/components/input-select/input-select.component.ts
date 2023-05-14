import { Component, Input } from '@angular/core';
import { ISelectOption } from '../../models/components.models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent {
  @Input() options?: Array<ISelectOption>;
  @Input() control!: FormControl;
}
