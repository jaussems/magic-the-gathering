import { Component } from '@angular/core';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  constructor(private _LoaderService: LoaderService) {
    this._LoaderService.setLoading(false);
  }
}
