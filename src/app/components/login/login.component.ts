import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciais';
import { LoginService } from 'src/app/service/login.service';

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

  constructor(private loginService: LoginService, private router: Router){
    this.loginService.setStatus(false);
    this.focus('input-email');
  }

  login() : void{
    if (this.loginService.login(this.email, this.senha)) {
      this.loginService.setStatus(true);
      this.router.navigate(['/home']);
    }
  }

  focus(idInput: string): void {
    document.getElementById(idInput)?.focus();
  }
}
