import { Component } from '@angular/core';
import { SideNavToggle } from './models/sideNavToggle';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private loginService: LoginService) {

  }

  title = 'sidnav-angular';

  isSideNavCollapsed = false;
  screenWidth = 0;
  statusSideNav = true;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    this.statusSideNav = data.statusSideNav;
  }

  observarStatusSideNav = this.loginService.status.subscribe((status) => {
    this.statusSideNav = status;
  })
}
