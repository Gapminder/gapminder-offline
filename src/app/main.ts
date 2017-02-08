import 'ng2-vizabi';
import '../polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

import 'zone.js/dist/zone';

platformBrowserDynamic().bootstrapModule(AppModule);
