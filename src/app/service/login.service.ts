import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public status = new BehaviorSubject<boolean>(true);

  setStatus(status: boolean) {
    this.status.next(status);
  }
}
