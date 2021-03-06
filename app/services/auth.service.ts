import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';

@Injectable()
export class AuthService{
	private loginUrl = "/authenticate";
	private registerUrl = "/registeruser";

	constructor(private http: Http){}

	register(data, callback){
		var email = data.email;
		var password = data.password;

		var creds = "email=" + email + "&password=" + password;
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post(this.registerUrl, creds, {
			headers: headers
		})
			.map(res => res.json())
			.subscribe(
			data => {
				this.saveJwt(data.token);
				callback(data);
			},
			err => console.log(err),
			() => console.log('Registration Complete')
			);
	}

	login(data, callback){
		var email = data.email;
		var password = data.password;

		var creds = "email=" + email + "&password=" + password;
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post(this.loginUrl, creds, {
			headers: headers
		})
			.map(res => res.json())
			.subscribe(
				data => {
					this.saveJwt(data.token)
					callback(data);
				},
				err => console.log(err),
				() => console.log('Authentication Complete')
			);		
	}

	saveJwt(jwt) {
		if(jwt) {
			localStorage.setItem('token', jwt)
		}
	}

	getJwt(){
		return localStorage.getItem('token');
	}

	private handleError(error: any){
		console.error(error);
		return Promise.reject(error.message || error.json().error || 'Server error');
	}
}