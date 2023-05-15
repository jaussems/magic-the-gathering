import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  constructor(private _LoaderService: LoaderService) {}

  ngOnInit(): void {
    this._LoaderService.setLoading(false);
  }
}
