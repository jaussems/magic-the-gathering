import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import {
  ICardArray,
  IGetCardsResponseObject,
} from '../shared/models/interfaces.models';
import { LoaderService } from '../shared/services/loader.service';
import { FormControl, FormGroup } from '@angular/forms';
import { manaSelectOptions, selectOptions } from './home.config';
import { dummyCardArray } from '../shared/models/data.models';
import { CardType, FilterOptions, Mana } from '../shared/enums/enums';
import { catchError, finalize, tap } from 'rxjs';

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
  defaultValue = dummyCardArray;

  searchFormGroup: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  selectFormGroup: FormGroup = new FormGroup({
    select: new FormControl([]),
    mana: new FormControl([]),
  });

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

    this._apiService.getCards().subscribe({
      next: (response) => {
        this.cards = response.cards;
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

    this.selectFormGroup.controls['select'].valueChanges.subscribe((value) => {
      this.resetArray();
      this.filterByOption(value);
    });

    this.selectFormGroup.controls['mana'].valueChanges.subscribe((value) => {
      this.resetArray();
      this.filterByMana(value);
    });
  }

  ngOnDestroy(): void {
    this._loaderService.isLoading.unsubscribe();
  }

  filterByOption(option: string) {
    if (option === FilterOptions.NameASC) {
      this.dummyCards = this.dummyCards
        .sort((a, b) => b.name.localeCompare(a.name))
        .filter((cards) => cards.name);
    }
    if (option === FilterOptions.NameDESC) {
      this.dummyCards = this.dummyCards
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((cards) => cards.name);
    }
    if (option === FilterOptions.Type) {
      this.dummyCards = this.dummyCards.filter(
        (cards) => cards.type === CardType.Instant
      );
    }
  }

  filterByMana(value: string) {
    if (value === Mana.White) {
      this.dummyCards = this.dummyCards.filter((cards) =>
        cards.colorIdentity.includes(Mana.White)
      );
    }
    if (value === Mana.Blue) {
      this.dummyCards = this.dummyCards.filter((cards) =>
        cards.colorIdentity.includes(Mana.Blue)
      );
    }
  }

  resetArray() {
    this.dummyCards = this.defaultValue;
  }

  search(event: any) {
    this.dummyCards = this.defaultValue.filter((cards) =>
      cards.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    if (!event.target.value) {
      this.resetArray();
    }
  }
}
