import {Component} from 'angular2/core';
import {NgForm, FORM_DIRECTIVES} from 'angular2/common';
import {RouterOutlet} from 'angular2/router';
import {AuthService} from '../services/auth.service';
import 'rxjs/add/operator/map';

@Component({
	selector: 'register-form',
	directives: [RouterOutlet, FORM_DIRECTIVES],
	providers: [AuthService],
	templateUrl: '/app/components/register.component.html'
})

export class RegisterComponent{
	constructor(private _authService: AuthService) {
	}

	register(data){		
		this._authService.register(data);
	}
}