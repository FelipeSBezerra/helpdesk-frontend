import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/service/auth.service';
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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
    private snackBar: SnackbarService
    ){
    this.loginService.setStatus(false);
    this.focus('input-email');
  }

  login() : void{
    if (this.loginService.login(this.email, this.senha)) {
      this.authService.authenticate(this.credenciais).subscribe(resposta => {
          var token = resposta.headers.get('Authentication');
          if (token != null) {
            this.authService.successfullLogin(token);
            this.loginService.setStatus(true);
            this.router.navigate(['/home']);
          }
      }, (e) => {
        console.log(e);
        if (e.status == 401) {
          this.snackBar.showMessage('Email e/ou senha inválidos (401)', true, 5000);
        } else if (e.status == 0){
          this.snackBar.showMessage('Erro na conexão com o servidor', true, 7000);
        }
      }
      )
    }
  }

  focus(idInput: string): void {
    document.getElementById(idInput)?.focus();
  }
}
