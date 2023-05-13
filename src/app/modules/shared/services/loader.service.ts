import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading: boolean = false;

  constructor() {}

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  getLoading(): boolean {
    return this.isLoading;
  }
}
