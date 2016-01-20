import {Component} from 'angular2/core';
import {NgForm, FORM_DIRECTIVES} from 'angular2/common';
import {RouterOutlet} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'register-form',
	directives: [RouterOutlet, FORM_DIRECTIVES],
	templateUrl: '/app/components/register.component.html'
})

export class RegisterComponent{
	private email: string;
	private password: string;

	constructor(public http: Http){
	}

	Register(){		
		var params = "email=" + this.email + "&password=" + this.password;

		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		this.http.post('/auth/signup', params, {
			headers: headers
		})
			.map(res => res.json())
			.subscribe(
				data => {
					console.dir(data)
				},
				err  => {
					console.log(err)
				},
				() => {
					console.log("signup completed")
				}
			);

		console.log('yay we signed up');
	}
}