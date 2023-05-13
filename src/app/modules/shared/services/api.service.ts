import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _HttpClient: HttpClient) {}

  async getCards() {
    return this._HttpClient.get<JSON>(`${apiUrl}/cards`);
  }
}
