import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(msg: string, isError: boolean, time?: number) : void {
    if (time != null) {
      this.snackBar.open(msg, 'X', {
        duration: time,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError? ['msg-error'] : ['msg-sucess']
      });
    } else {
      this.snackBar.open(msg, 'X', {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: isError? ['msg-error'] : ['msg-sucess']
      });
    }
  }
}
