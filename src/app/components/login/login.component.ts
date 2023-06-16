import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';
import { LoginService } from 'src/app/service/login.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  hide = true;

  credenciais: Credenciais = {
    email:'',
    senha:''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private loginService: LoginService, private snackBar: SnackbarService){
    this.loginService.setStatus(false);
    this.focus('input-email');
  }

  login() : void{
    this.loginService.login(this.email, this.senha);
  }

  focus(idInput: string): void {
    document.getElementById(idInput)?.focus();
  }
}
