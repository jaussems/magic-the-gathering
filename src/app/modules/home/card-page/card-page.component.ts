import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICard } from '../../shared/models/interfaces.models';
import { ApiService } from '../../shared/services/api.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private _apiService: ApiService,
    private _loaderService: LoaderService
  ) {
    this._loaderService.isLoading.next(true);
  }
  card: ICard = {} as ICard;
  ngOnInit() {
    const cardId = this.route.snapshot.paramMap.get('id');
    //test ID: 386616
    if (cardId) {
      this._apiService.getSingleCard(cardId).subscribe((data) => {
        this.card = data.card;
        if (this.card) {
          this._loaderService.isLoading.next(false);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this._loaderService.isLoading.unsubscribe();
  }
}
