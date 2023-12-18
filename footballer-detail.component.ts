import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Footballer } from '../footballer';
import { FootballerService } from '../footballer.service';

@Component({
  selector: 'app-footballer-detail',
  templateUrl: './footballer-detail.component.html',
  styleUrls: ['./footballer-detail.component.css'],
})
export class FootballerDetailComponent implements OnInit {
  footballer: Footballer | undefined;

  constructor(
    private route: ActivatedRoute,
    private footballerService: FootballerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFootballer();
  }
  
  getFootballer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.footballerService.getFootballer(id)
      .subscribe(footballer => this.footballer = footballer);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.footballer) {
      this.footballerService.updateFootballer(this.footballer)
        .subscribe(() => this.goBack());
    }
  }
}
