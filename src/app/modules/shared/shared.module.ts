import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardComponent, SpinnerComponent, InputSelectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CardComponent, SpinnerComponent, InputSelectComponent],
})
export class SharedModule {}
