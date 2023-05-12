import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CardPageComponent } from './card-page/card-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'card', component: CardPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
