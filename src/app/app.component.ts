import { Component, OnDestroy } from '@angular/core';
import { LoaderService } from './modules/shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'magic-the-gathering';
  loading = false;
  constructor(private _loaderService: LoaderService) {
    this._loaderService.isLoading$.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy(): void {
    this._loaderService.isLoading$.unsubscribe();
  }
}
