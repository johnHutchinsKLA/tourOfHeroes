import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HeroesComponent} from './Components/heroes/heroes.component';
import {HeroDetailComponent} from './Components/hero-detail/hero-detail.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component';
import {HeroResolver} from './Resolvers/hero-resolver';
import {HeroDetailGuard} from './Guards/hero-detail-guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: HeroesComponent },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
    resolve: {
      hero: HeroResolver
    },
    canDeactivate: [HeroDetailGuard]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
