import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';

@Injectable()
export class AuthService{
	private loginUrl = "/authenticate";
	private registerUrl = "/registeruser";

	constructor(private http: Http){}

	login(data){
		var email = data.credentials.email;
		var password = data.credentials.password;

		var creds = "email=" + email + "&password" + password;
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		return this.http.post(this.loginUrl, creds, {
							headers: headers
						})
						.toPromise()
						.then(res => res.json().data, this.handleError)
						.then(data => {
							console.log(data);
							return data;
						});
	}

	private handleError(error: any){
		console.error(error);
		return Promise.reject(error.message || error.json().error || 'Server error');
	}

	register(email, password){

	}
}