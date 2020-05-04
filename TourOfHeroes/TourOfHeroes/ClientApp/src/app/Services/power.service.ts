import {Inject, Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Power} from '../Models/power';

@Injectable({
  providedIn: 'root'
})
export class PowerService {

  private powersURL = '';

  public powers: BehaviorSubject<Power[]> = new BehaviorSubject<Power[]>([]);

  constructor(@Inject('BASE_URL') baseUrl: string, private messageService: MessageService, private http: HttpClient) {
    this.powersURL = baseUrl + 'powers';
    this.refreshPowers();
  }

  public refreshPowers() {
    this.getPowers().subscribe();
  }

  public getPowers(): Observable<Power[]> {
    return this.http.get<Power[]>(this.powersURL + '/getPowers')
      .pipe(
        tap(powers => {
          this.powers.next(powers);
          this.log('fetched powers');
        }),
        catchError(this.handleError<Power[]>('getPowers', []))
      );
  }

  public searchPowers(term: string): Observable<Power[]> {
    if (!term.trim()) {
      return of([]);
    }

    return of(this.powers.getValue().filter(power => power.name.toUpperCase().indexOf(term.toUpperCase()) > -1));
  }

  private log(message: string): void {
    this.messageService.add(`PowerService: ${message}`);
  }

  public handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
