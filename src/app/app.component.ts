import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService) {
    if (!electronService.isElectron()) {
      console.log('AppConfig', AppConfig);
      console.log('Mode web');
    }
  }
}
