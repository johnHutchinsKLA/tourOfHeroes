import {Component, OnInit} from '@angular/core';
import {HeroService} from '../../Services/hero.service';
import {ModalService} from '../../Services/modal.service';
import {Hero} from '../../Models/hero';
import {DialogData} from '../../Models/dialog-data';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  dialogOptions: DialogData = {
    message: 'Are you sure you want to delete this hero?',
    confirmText: 'Delete',
    rejectText: 'Cancel',
    confirmColor: 'red'
  };

  constructor(private heroService: HeroService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.heroes.subscribe(heroes => {
      this.heroes = heroes;
    });
    this.heroService.refreshHeroes();
  }

  add(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero).subscribe();
  }

  delete(hero) {

    this.modalService.openDialog(this.dialogOptions).subscribe(result => {
      if (!!result) {
        this.heroService.deleteHero(hero).subscribe();
      }
    });
  }
}
