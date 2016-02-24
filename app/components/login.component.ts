import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {RouterOutlet} from 'angular2/router';
import {AuthService} from '../services/auth.service';

@Component({
	selector: 'login-form',
	directives: [RouterOutlet, NgForm],
	providers: [AuthService],
	templateUrl: '/app/components/login.component.html'
})

export class LoginComponent{
	constructor(private _authService: AuthService){}

	authenticate(data){
		console.log(data);
	}
}