import {Component, OnInit} from '@angular/core';
import {HeroService} from '../../Services/hero.service';
import {Hero} from '../../Models/hero';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.heroes.subscribe(heroes => {
      this.heroes = heroes.slice(0, 4);
    });
    this.heroService.refreshHeroes();
  }
}
