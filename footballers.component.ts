import {Component, OnInit} from '@angular/core';

import { Footballer } from '../footballer';
import { FootballerService } from '../footballer.service';

@Component({
    selector: 'app-footballers',
    templateUrl: './footballers.component.html',
    styleUrls: ['./footballers.component.css'],
})

export class FootballersComponent implements OnInit {
  footballers: Footballer[] = [];

  constructor(private footballerService: FootballerService) { }

  ngOnInit(): void {
    this.getFootballers();
  }

  getFootballers(): void {
    this.footballerService.getFootballers()
        .subscribe(footballers => this.footballers = footballers);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.footballerService.addFootballer({ name } as Footballer)
      .subscribe(footballer => {
        this.footballers.push(footballer);
      });
  }

  delete(footballer: Footballer): void {
    this.footballers = this.footballers.filter(h => h !== footballer);
    this.footballerService.deleteFootballer(footballer.id).subscribe();
  }
}
