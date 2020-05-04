import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HeroService} from '../Services/hero.service';
import {Hero} from '../Models/hero';

@Injectable({ providedIn: 'root' })
export class HeroResolver implements Resolve<Hero> {
  constructor(private service: HeroService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.service.getHero(+route.paramMap.get('id'));
  }
}
