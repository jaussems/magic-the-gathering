import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { ICardArray } from '../shared/models/interfaces.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cards: ICardArray = [];
  constructor(private _ApiService: ApiService) {}

  ngOnInit(): void {
    this._ApiService.getCards().subscribe((data) => {
      this.cards = data.cards;
    });
  }
}
