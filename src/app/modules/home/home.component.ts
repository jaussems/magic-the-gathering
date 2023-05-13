import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { ICardArray } from '../shared/models/interfaces.models';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cards: ICardArray = [];
  constructor(
    private _ApiService: ApiService,
    private _loaderService: LoaderService
  ) {
    this._loaderService.isLoading.next(true);
  }

  ngOnInit(): void {
    this._ApiService.getCards().subscribe((data) => {
      this.cards = data.cards;
      if (this.cards) {
        this._loaderService.isLoading.next(false);
      }
    });
  }
}
