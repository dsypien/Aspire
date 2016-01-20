import {Component } from 'angular2/core';
import {RouterOutlet} from 'angular2/router';
import {CalendarComponent} from './calendar.component';
import {GoalListComponent} from './goal-list.component';

@Component({
    selector: 'home',
    directives: [GoalListComponent, CalendarComponent, RouterOutlet],
    templateUrl: '/app/components/home.component.html'
})

export class HomeComponent {

	constructor() {
		// if logged in use remote-goals.service
		// otherwise use local-goals.service
	}
}