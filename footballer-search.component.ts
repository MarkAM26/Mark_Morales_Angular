import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Footballer } from '../footballer';
import { FootballerService } from '../footballer.service';

@Component({
  selector: 'app-footballer-search',
  templateUrl: './footballer-search.component.html',
  styleUrl: './footballer-search.component.css'
})
export class FootballerSearchComponent implements OnInit {
  footballers$!: Observable<Footballer[]>;
  private searchTerms = new Subject<string>();

  constructor(private footballerService: FootballerService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.footballers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.footballerService.searchFootballers(term)),
    );
  }
}
