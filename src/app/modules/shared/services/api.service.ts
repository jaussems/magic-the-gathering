import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../config/config';
import { Observable } from 'rxjs';
import { IGetCardsResponseObject } from '../models/interfaces.models';
import { Crud } from '../enums/enums';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _HttpClient: HttpClient) {}

  getCards() {
    return this._HttpClient.request<IGetCardsResponseObject>(
      Crud.Get,
      `${apiUrl}` + 'cards'
    );
  }
}
