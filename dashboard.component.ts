import { Component, OnInit } from '@angular/core';
import { Footballer } from '../footballer';
import { FootballerService } from '../footballer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  footballers: Footballer[] = [];
  
  constructor(private heroService: FootballerService) { }
  
  ngOnInit(): void {
    this.getFootballers();
  }
  
  getFootballers(): void {
    this.heroService.getFootballers()
      .subscribe(footballers => this.footballers = footballers.slice(0, 5));
  }
}

