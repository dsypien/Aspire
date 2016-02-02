import {Component, Input} from 'angular2/core';
import {RouterOutlet} from 'angular2/router';
import {CalendarComponent} from './calendar.component';
import {GoalListComponent} from './goal-list.component';
import {Goal} from '../common/Goal';
import {LocalGoalsService} from '../services/local-goals.service';

@Component({
    selector: 'home',
    directives: [GoalListComponent, CalendarComponent, RouterOutlet],
    templateUrl: '/app/components/home.component.html',
    providers: [LocalGoalsService]
})

export class HomeComponent {
	@Input() goals: Goal[];

	constructor(private _localGoalService : LocalGoalsService) {
		// if logged in use remote-goals.service
		// otherwise use local-goals.service
	}

	createGoal(goal){
		if(goal){
			this._localGoalService.create(goal);
		}
	}
}