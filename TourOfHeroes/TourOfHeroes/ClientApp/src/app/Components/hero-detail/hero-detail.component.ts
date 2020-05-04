import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {HeroService} from '../../Services/hero.service';
import {PowerService} from '../../Services/power.service';
import {ModalService} from '../../Services/modal.service';
import {Hero} from '../../Models/hero';
import {Power} from '../../Models/power';
import {DialogData} from '../../Models/dialog-data';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  powers$: Observable<Power[]>;
  private searchTerms = new Subject<string>();
  dialogOptions: DialogData = {
    message: 'Are you sure you want to update this hero?',
    confirmText: 'Update',
    rejectText: 'Cancel',
    confirmColor: 'green'
  };
  isDirty = false;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private powerService: PowerService,
              private modalService: ModalService,
              private location: Location) { }

  ngOnInit(): void {
    this.getHero();
    this.powers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.powerService.searchPowers(term))
    );
  }

  getHero(): void {
    this.hero = this.route.snapshot.data.hero as Hero;
  }

  save() {
    this.modalService.openDialog(this.dialogOptions).subscribe(result => {
      if (!!result) {
        this.isDirty = false;
        this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  newPower(power: string) {
    if (!!power) {
      this.addPower(power);
      this.searchTerms.next('');
    }
  }

  addPower(power: string) {
    this.hero.powers.push({name: power});
    this.isDirty = true;
  }

  removePower(power: string) {
    this.hero.powers = this.hero.powers.filter(currentPower => {
      return currentPower.name !== power;
    });
    this.isDirty = true;
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  async confirmNavigation(navConfirmOptions: DialogData): Promise<boolean> {
    return await this.modalService.openDialog(navConfirmOptions).toPromise();
  }
}
