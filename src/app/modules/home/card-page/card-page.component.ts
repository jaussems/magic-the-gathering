import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICard } from '../../shared/models/interfaces.models';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _apiService: ApiService
  ) {}
  card: ICard = {} as ICard;
  ngOnInit() {
    const cardId = this.route.snapshot.paramMap.get('id');
    //test ID: 386616
    if (cardId) {
      this._apiService.getSingleCard(cardId).subscribe((data) => {
        this.card = data.card;
      });
    }
  }
}
