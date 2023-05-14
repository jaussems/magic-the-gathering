import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { ICardArray } from '../shared/models/interfaces.models';
import { LoaderService } from '../shared/services/loader.service';
import { FormControl, FormGroup } from '@angular/forms';
import { manaSelectOptions, selectOptions } from './home.config';
import { dummyCardArray } from '../shared/models/data.models';

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
    if (option === 'name') {
      this.dummyCards = this.dummyCards
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((cards) => cards.name);
    }
    if (option === 'type') {
      this.dummyCards = this.dummyCards.filter(
        (cards) => cards.type === 'Instant'
      );
    }
  }

  filterByMana(value: string) {
    if (value === 'W') {
      this.dummyCards = this.dummyCards.filter((cards) =>
        cards.colorIdentity.includes('W')
      );
    }
    if (value === 'U') {
      this.dummyCards = this.dummyCards.filter((cards) =>
        cards.colorIdentity.includes('U')
      );
    }
  }

  resetArray() {
    this.dummyCards = this.defaultValue;
  }
}
