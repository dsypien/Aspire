import {Component} from 'angular2/core';
import {HomeComponent} from './home.component';

@Component({
    selector: 'my-app',
    directives: [HomeComponent],
    templateUrl: '/app/components/app.component.html'
})

export class AppComponent { 
	constructor(){
	}
}