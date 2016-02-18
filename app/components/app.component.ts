import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';

@Component({
    selector: 'my-app',
    directives: [HomeComponent, ROUTER_DIRECTIVES],
    templateUrl: '/app/components/app.component.html'
})

@RouteConfig([
	{path: '/', name: 'Home', component: HomeComponent },
	{path: '/login', name: 'Login', component: LoginComponent},
	{path: '/register', name: 'Register', component: RegisterComponent}
])

export class AppComponent { 
	constructor(){
	}
}