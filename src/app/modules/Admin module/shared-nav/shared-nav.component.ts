
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-nav',
  templateUrl: './shared-nav.component.html',
  styleUrls: ['./shared-nav.component.scss']
})
export class SharedNavComponent {
  @Input() buttons: any[] = [];

  constructor(private router: Router) { }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
