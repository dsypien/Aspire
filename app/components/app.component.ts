import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Location, Router} from 'angular2/router';
import {NgClass} from 'angular2/common';

import {HomeComponent} from './home.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';

@Component({
    selector: 'my-app',
    directives: [HomeComponent, ROUTER_DIRECTIVES, NgClass],
    templateUrl: '/app/components/app.component.html'
})

@RouteConfig([
	{path: '/', name: 'Home', component: HomeComponent },
	{path: '/login', name: 'Login', component: LoginComponent},
	{path: '/register', name: 'Register', component: RegisterComponent}
])

export class AppComponent { 
	constructor(private _location: Location, private _router: Router){
	}

	isActive(curRouteName){
		return this._router.isRouteActive(this._router.generate(curRouteName));
	}

}