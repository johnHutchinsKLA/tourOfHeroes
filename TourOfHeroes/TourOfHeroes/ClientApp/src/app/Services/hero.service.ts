import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {PowerService} from './power.service';
import {Hero} from '../Models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = '';

  public heroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);

  public httpOptions: { [key: string]: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(@Inject('BASE_URL') baseUrl: string,
              private messageService: MessageService,
              private powerService: PowerService,
              private http: HttpClient) {
    this.heroesUrl = baseUrl + 'heroes';
    this.refreshHeroes();
  }

  public refreshHeroes(): void {
    this.getHeroes().subscribe();
  }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl + '/getHeroes')
      .pipe(
        tap(heroes => {
          this.heroes.next(heroes);
          this.log('fetched heroes');
        }),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  public getHero(id: number): Observable<Hero> {
    // Check local heroes object first
    const hero = this.heroes.getValue().find(currentHero => {
      currentHero.id = id;
    });

    if (!!hero) {
      return of(hero);
    } else {
      // If we didn't find it in local storage, check server
      const url = `${this.heroesUrl}/getHero/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(resultHero => {
          this.updateHeroInMasterList(resultHero);
          this.log(`fetched hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    }
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return of(this.heroes.getValue().filter(hero => hero.name.toUpperCase().indexOf(term.toUpperCase()) > -1));
  }

  public updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl + '/update' + `/${hero.id}`, JSON.stringify(hero), this.httpOptions).pipe(
      tap((updatedHero: Hero) => {
        this.updateHeroInMasterList(updatedHero);
        this.powerService.refreshPowers();
        this.log(`updated hero id = ${hero.id}`);
      }),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  public addHero(hero: Hero): Observable<any> {
    hero.id = 0;
    return this.http.post<Hero>(this.heroesUrl, JSON.stringify(hero), this.httpOptions).pipe(
      tap((newHero: Hero) => {
        this.updateHeroInMasterList(newHero);
        this.log(`added hero w/ id=${newHero.id}`);
      }),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  public deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => {
        // remove hero from master list
        let heroes = this.heroes.getValue();
        heroes = heroes.filter(currentHero => {
          return currentHero.id !== id;
        });
        this.heroes.next(heroes);
        this.log(`deleted hero id=${id}`);
      }),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  private updateHeroInMasterList(hero: Hero): void {
    let heroes = this.heroes.getValue();
    heroes = heroes.filter(x => {
      return x.id !== hero.id;
    });
    heroes.push(hero);
    heroes = heroes.sort((x, y) => {
      return x > y ? -1 : 1;
    });
    this.heroes.next(heroes);
  }

  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  public handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
