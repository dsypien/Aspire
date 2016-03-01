import {Component} from 'angular2/core';
import {NgForm, FORM_DIRECTIVES} from 'angular2/common';
import {RouterOutlet} from 'angular2/router';
import {AuthService} from '../services/auth.service';
import {NotifyBar} from './notifyBar.component';

@Component({
	selector: 'login-form',
	directives: [RouterOutlet, NgForm, NotifyBar],
	providers: [AuthService],
	templateUrl: '/app/components/login.component.html'
})

export class LoginComponent{
	private notifyMsg: string;
	private notifyTitle: string;
	private displayNotification = false;

	constructor(private _authService: AuthService){}

	authenticate(data){
		this._authService.login(data);
		this.notifyTitle = "Invalid login";
		this.notifyMsg = "Invalid username or password";
		this.displayNotification = true;
	}
}