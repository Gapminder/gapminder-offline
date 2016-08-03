import {provide, enableProdMode, OnInit} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {Component} from '@angular/core';
import {APP_ROUTER_PROVIDER} from './routes';

import {createStore} from 'redux';
import {rootReducer} from './rootReducer';

const appStore = createStore(rootReducer);

@Component({
    selector: 'ae-app', // <app></app>
    directives: [ROUTER_DIRECTIVES],
    template: `
    <div>
        <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent implements OnInit {
    ngOnInit() {
    }
}

bootstrap(AppComponent, [
    ...HTTP_PROVIDERS,
    APP_ROUTER_PROVIDER,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide('AppStore', { useValue: appStore })
]).catch(err => console.error(err));
