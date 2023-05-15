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
export class CardPageComponent implements OnInit {
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
      this._apiService.getSingleCard(cardId).subscribe({
        next: (response) => {
          this.card = response.card;
        },
        error: (error) => {
          alert('There was an error in retrieving data from the server');
          if (error) {
            this._loaderService.setLoading(false);
          }
        },
        complete: () => {
          this._loaderService.setLoading(false);
        },
      });
    }
  }
}
