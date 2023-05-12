import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardPageComponent } from './card-page/card-page.component';

@NgModule({
  declarations: [HomeComponent, CardPageComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
