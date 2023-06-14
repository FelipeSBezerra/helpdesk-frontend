import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Input() statusSideNav = true;

  getBodyClass(): string {
    let styleClass = '';
    if(!this.statusSideNav) {
      styleClass = 'body-full';
    } else if(this.collapsed && this.screenWidth > 768 && this.statusSideNav) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0 && this.statusSideNav) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
