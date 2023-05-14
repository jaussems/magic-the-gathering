import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { ICardArray } from '../shared/models/interfaces.models';
import { LoaderService } from '../shared/services/loader.service';
import { FormControl, FormGroup } from '@angular/forms';
import { manaSelectOptions, selectOptions } from './home.config';
import { dummyCardArray } from '../shared/models/data.models';
import { CardType, FilterOptions, Mana } from '../shared/enums/enums';

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
  selectFormGroup: FormGroup = new FormGroup({
    select: new FormControl([]),
    mana: new FormControl([]),
  });

  get selectControl() {
    return this.selectFormGroup.controls['select'] as FormControl;
  }

  get manaSelectControl() {
    return this.selectFormGroup.controls['mana'] as FormControl;
  }
  constructor(
    private _ApiService: ApiService,
    private _loaderService: LoaderService
  ) {
    this._loaderService.isLoading.next(false);
  }

  ngOnInit(): void {
    // this._ApiService.getCards().subscribe((data) => {
    //   this.cards = data.cards;
    //   if (this.cards) {
    //     this._loaderService.isLoading.next(false);
    //   }
    // });

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
    if (option === FilterOptions.Name) {
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
}
