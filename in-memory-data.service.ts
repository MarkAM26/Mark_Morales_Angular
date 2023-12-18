import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Footballer } from './footballer';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService { 
  createDb() {
    const footballers = [
      { id: 1, name: 'Antoine Griezmann' },
      { id: 2, name: 'Alvaro Morata' },
      { id: 3, name: 'Rasmus Hojlund' },
      { id: 4, name: 'Erling Haaland' },
      { id: 5, name: 'Evanilson' },
      { id: 6, name: 'Wenderson Galeno' },
      { id: 7, name: 'Gabriel Jesus' },
      { id: 8, name: 'Julian Alvarez' },
      { id: 9, name: 'Harry Kane' },
      { id: 10, name: 'Jude Bellingham' }
    ];
    return {footballers};
  }

  // Overrides the genId method to ensure that a footballer always has an id.
  // If the footballers array is empty,
  // the method below returns the initial number (11).
  // if the footballers array is not empty, the method below returns the highest
  // footballer id + 1.
  genId(footballers: Footballer[]): number {
    return footballers.length > 0 ? Math.max(...footballers.map(footballer => footballer.id)) + 1 : 11;
  }
}