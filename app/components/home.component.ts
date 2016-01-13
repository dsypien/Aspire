import {Component } from 'angular2/core';
import {GoalListComponent} from './goal-list.component';

@Component({
    selector: 'home',
    directives: [GoalListComponent],
    templateUrl: '/app/components/home.component.html'
})

export class HomeComponent {

	constructor() {
		// if logged in use remote-goals.service
		// otherwise use local-goals.service
	}
}