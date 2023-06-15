import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;

  constructor(private loginService: LoginService){
    this.loginService.setStatus(false);
  }

  inverte (){
    this.hide = !this.hide;
  }

}
