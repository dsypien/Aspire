import {Component} from 'angular2/core';
import {NgForm, FORM_DIRECTIVES} from 'angular2/common';
import {RouterOutlet, Router} from 'angular2/router';
import {AuthService} from '../services/auth.service';
import {NotifyBar} from './notifyBar.component';
import 'rxjs/add/operator/map';

@Component({
	selector: 'register-form',
	directives: [RouterOutlet, FORM_DIRECTIVES, NotifyBar],
	providers: [AuthService],
	templateUrl: '/app/components/register.component.html'
})

export class RegisterComponent{
	private notifyTitle : string;
	private notifyMsg : string;
	private displayNotification: boolean;

	constructor(private _authService: AuthService, private _router: Router) {
	}

	register(data){		
		this.displayNotification = false;
		var that = this;
		this._authService.register(data, function(res){
			that.onRegister(res);
		});
	}

	onRegister(data){
		if(data.success){
			this._router.navigate(['Home']);
		}
		else{
			this.notifyTitle= "Unable to register";
			this.notifyMsg = data.message;
			this.displayNotification = true;
		}
	}
}