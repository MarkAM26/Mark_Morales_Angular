import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Footballer } from './footballer';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class FootballerService {

  private footballersUrl = 'api/footballers';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET footballers from the server */
  getFootballers(): Observable<Footballer[]> {
    return this.http.get<Footballer[]>(this.footballersUrl)
      .pipe(
        tap(_ => this.log('fetched footballers')),
        catchError(this.handleError<Footballer[]>('getFootballers', []))
      );
  }

  /** GET footballer by id. Return `undefined` when id not found */
  getFootballerNo404<Data>(id: number): Observable<Footballer> {
    const url = `${this.footballersUrl}/?id=${id}`;
    return this.http.get<Footballer[]>(url)
      .pipe(
        map(footballers => footballers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} football id=${id}`);
        }),
        catchError(this.handleError<Footballer>(`getFootballer id=${id}`))
      );
  }

  /** GET footballer by id. Will 404 if id not found */
  getFootballer(id: number): Observable<Footballer> {
    const url = `${this.footballersUrl}/${id}`;
    return this.http.get<Footballer>(url).pipe(
      tap(_ => this.log(`fetched footballer id=${id}`)),
      catchError(this.handleError<Footballer>(`getFootballer id=${id}`))
    );
  }

  /* GET footballers whose name contains search term */
  searchFootballers(term: string): Observable<Footballer[]> {
    if (!term.trim()) {
      // if not search term, return empty footballer array.
      return of([]);
    }
    return this.http.get<Footballer[]>(`${this.footballersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found footballers matching "${term}"`) :
        this.log(`no footballers matching "${term}"`)),
      catchError(this.handleError<Footballer[]>('searchFootballers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new footballer to the server */
  addFootballer(footballer: Footballer): Observable<Footballer> {
    return this.http.post<Footballer>(this.footballersUrl, footballer, this.httpOptions).pipe(
      tap((newFootballer: Footballer) => this.log(`added footballer w/ id=${newFootballer.id}`)),
      catchError(this.handleError<Footballer>('addFootballer'))
    );
  }

  /** DELETE: delete the footballer from the server */
  deleteFootballer(id: number): Observable<Footballer> {
    const url = `${this.footballersUrl}/${id}`;

    return this.http.delete<Footballer>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted footballer id=${id}`)),
      catchError(this.handleError<Footballer>('deleteFootballer'))
    );
  }

  /** PUT: update the footballer on the server */
  updateFootballer(footballer: Footballer): Observable<any> {
    return this.http.put(this.footballersUrl, footballer, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${footballer.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
