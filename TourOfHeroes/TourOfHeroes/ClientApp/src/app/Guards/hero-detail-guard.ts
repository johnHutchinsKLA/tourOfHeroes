import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {HeroDetailComponent} from '../Components/hero-detail/hero-detail.component';
import {DialogData} from '../Models/dialog-data';

@Injectable()
export class HeroDetailGuard implements CanDeactivate<HeroDetailComponent> {
  navConfirmOptions: DialogData = {
    message: 'Are you sure?  Any unsaved changes will be lost.',
    confirmText: 'Continue',
    rejectText: 'Cancel',
    confirmColor: 'red'
  };

  canDeactivate(component: HeroDetailComponent): boolean | Promise<boolean> {
    if (component.isDirty) {
      return component.confirmNavigation(this.navConfirmOptions);
    }
    return true;
  }
}
