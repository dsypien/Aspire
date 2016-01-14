import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from './home.component';
import {Login} from './login.component';
import {Register} from './register.component';

@Component({
    selector: 'my-app',
    directives: [HomeComponent, ROUTER_DIRECTIVES],
    templateUrl: '/app/components/app.component.html'
})

@RouteConfig([
	{
		path: '/home',
		name: 'Home',
		component: HomeComponent,
		useAsDefault: true
	},
	{path: '/login', name: 'Login', component: Login},
	{path: '/register', name: 'Register', component: Register}
])

export class AppComponent { 
	constructor(){
	}
}