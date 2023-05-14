import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { ICardArray } from '../shared/models/interfaces.models';
import { LoaderService } from '../shared/services/loader.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  IArrayOptions,
  ISelectOption,
} from '../shared/models/components.models';
import { selectOptions } from './home.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cards: ICardArray = [];
  selectOptions = selectOptions;

  selectFormGroup: FormGroup = new FormGroup({
    select: new FormControl([]),
  });

  get selectControl() {
    return this.selectFormGroup.controls['select'] as FormControl;
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
      console.log(value);
    });
  }

  ngOnDestroy(): void {
    this._loaderService.isLoading.unsubscribe();
  }
}
