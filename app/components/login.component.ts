import {Component} from 'angular2/core';
import {NgForm, FORM_DIRECTIVES} from 'angular2/common';
import {RouterOutlet, Router, RouteParams} from 'angular2/router';
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

	constructor(private _authService: AuthService, private _router: Router){}

	authenticate(data){
		var that = this;
		this._authService.login(data, function(data){
			that.onLogin(data);
		});
	}

	onLogin(data){
		console.log(data);
		if(data.success){
			this._router.navigate(['Home']);
		}
		else{
			this.notifyTitle = "Invalid login";
			this.notifyMsg = data.message;
			this.displayNotification = true;
		}
	}
}