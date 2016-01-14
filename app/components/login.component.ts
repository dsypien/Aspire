import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {RouterOutlet} from 'angular2/router';

@Component({
	selector: 'login-form',
	directives: [RouterOutlet],
	templateUrl: '/app/components/login.component.html'
})

export class Login{

}