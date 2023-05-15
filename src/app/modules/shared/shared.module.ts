import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardComponent,
    SpinnerComponent,
    InputSelectComponent,
    InputComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    CardComponent,
    SpinnerComponent,
    InputSelectComponent,
    InputComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
