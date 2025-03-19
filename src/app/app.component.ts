import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NzPageHeaderModule,
    NzLayoutModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'technofarm';
}
