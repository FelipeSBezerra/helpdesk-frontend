import { Component } from '@angular/core';
import { SideNavToggle } from './models/sideNavToggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sidnav-angular';

  isSideNavCollapsed = false;
  screenWidth = 0;
  statusSideNav = true;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
    this.statusSideNav = data.statusSideNav;
  }
}
