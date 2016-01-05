import {Component} from 'angular2/core';
import {GoalListComponent} from './goal-list.component';

@Component({
    selector: 'my-app',
    directives: [GoalListComponent],
    templateUrl: '/app/components/app.component.html'
})

export class AppComponent { 

	constructor(){
		// if logged in use remote-goals.service
		// otherwise use local-goals.service
	}

}