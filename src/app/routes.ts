import {provideRouter, RouterConfig} from '@angular/router';
import {StartComponent} from './components/start';
import {HomeComponent} from './components/home';

export const appRoutes: RouterConfig = [
  {path: '', component: StartComponent},
  {path: 'start', component: StartComponent},
  {path: 'home', component: HomeComponent}
];

export const APP_ROUTER_PROVIDER = provideRouter(appRoutes);
