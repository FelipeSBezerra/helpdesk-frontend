import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private snackBar: SnackbarService) { }

  public status = new BehaviorSubject<boolean>(true);

  setStatus(status: boolean) {
    this.status.next(status);
  }

  validarCampos(email: FormControl<null>, senha: FormControl<null>): boolean {
    if (email.valid && senha.valid) {
      return true
    }
    return false;
  }

  login(email: FormControl<null>, senha: FormControl<null>) : boolean {
    if (this.validarCampos(email, senha)){
      this.snackBar.showMessage('Login efetuado', false);
      return true;
    } else {
      this.snackBar.showMessage('Preencha os campos com dados válidos antes de fazer login', true);
      return false;
    }
  }
}
