import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading$ = new BehaviorSubject(false);

  constructor() {}

  setLoading(loading: boolean) {
    this.isLoading$.next(loading);
  }

  getLoading(): boolean {
    return this.isLoading$.value;
  }
}
