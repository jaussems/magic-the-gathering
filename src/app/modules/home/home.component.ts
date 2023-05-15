import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import {
  ICard,
  ICardArray,
  IGetCardsResponseObject,
} from '../shared/models/interfaces.models';
import { LoaderService } from '../shared/services/loader.service';
import { FormControl, FormGroup } from '@angular/forms';
import { manaSelectOptions, selectOptions } from './home.config';
import { dummyCardArray } from '../shared/models/data.models';
import { CardType, FilterOptions, Mana } from '../shared/enums/enums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cards: ICardArray = [];
  selectOptions = selectOptions;
  manaSelectOptions = manaSelectOptions;
  dummyCards = dummyCardArray;
  defaultValue: ICardArray = [];
  private readonly subscription = new Subscription();

  searchFormGroup: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  selectFormGroup: FormGroup = new FormGroup({
    select: new FormControl([]),
    mana: new FormControl([]),
  });

  //getters
  get searchControl() {
    return this.searchFormGroup.controls['search'] as FormControl;
  }

  get selectControl() {
    return this.selectFormGroup.controls['select'] as FormControl;
  }

  get manaSelectControl() {
    return this.selectFormGroup.controls['mana'] as FormControl;
  }
  constructor(
    private _apiService: ApiService,
    private _loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this._loaderService.setLoading(true);
    //dummyData in case API call breaks
    //this.cards = this.removeDuplicates(dummyCardArray as ICardArray);
    this.getData();
    this.subscription.add(
      this.selectFormGroup.controls['select'].valueChanges.subscribe(
        (value) => {
          this.resetArray();
          this.filterByOption(value);
        }
      )
    );
    this.subscription.add(
      this.selectFormGroup.controls['mana'].valueChanges.subscribe((value) => {
        this.resetArray();
        this.filterByMana(value);
      })
    );
  }

  getData() {
    this._apiService.getCards().subscribe({
      next: (response) => {
        this.cards = this.removeDuplicates(response.cards);
        this.defaultValue = [...this.cards];
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

  filterByOption(option: string) {
    switch (option) {
      case FilterOptions.NameASC:
        this.cards = this.cards
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter((cards) => cards.name);
        break;

      case FilterOptions.NameDESC:
        this.cards = this.cards
          .sort((a, b) => b.name.localeCompare(a.name))
          .filter((cards) => cards.name);
        break;

      case FilterOptions.Type:
        this.cards = this.cards.filter(
          (cards) => cards.type === CardType.Instant
        );
        break;
      default:
        this.cards = this.defaultValue;
    }
  }

  filterByMana(value: string) {
    switch (value) {
      case Mana.White:
        this.cards = this.cards.filter((card) =>
          card.colorIdentity.includes(Mana.White)
        );
        break;
      case Mana.Blue:
        this.cards = this.cards.filter((card) =>
          card.colorIdentity.includes(Mana.Blue)
        );
        break;
      default:
        this.cards = this.defaultValue;
    }
  }

  resetArray() {
    this.cards = this.defaultValue;
  }

  search(event: any) {
    this.cards = this.defaultValue.filter((cards) =>
      cards.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    if (!event.target.value) {
      this.resetArray();
    }
  }
  removeDuplicates(arr: ICardArray) {
    const filtered = arr.filter((card: ICard) => {
      return card.imageUrl !== undefined;
    });

    return filtered;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
