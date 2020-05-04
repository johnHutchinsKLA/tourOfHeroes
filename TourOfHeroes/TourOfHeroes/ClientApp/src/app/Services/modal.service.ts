import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ConfirmationModalComponent} from '../Components/confirmation-modal/confirmation-modal.component';
import {DialogData} from '../Models/dialog-data';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogOptions: DialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
      data: dialogOptions
    });

    return dialogRef.afterClosed();
  }
}
