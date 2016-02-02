import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {GoalItemComponent} from './goal-item.component';
import {CreateGoalComponent} from './create-goal.component';
import {OnInit, OnDestroy} from 'angular2/core';
import {GoalServiceInterface} from '../interfaces/GoalService.Interface';
import {GoalInterface} from '../interfaces/Goal.Interface';
import {Goal} from '../common/Goal';

@Component({
	selector: 'goal-list',
	templateUrl: '/app/components/goal-list.component.html',
	directives: [GoalItemComponent, CreateGoalComponent]
})

export class GoalListComponent{
	@Input() goals: Goal[];
	@Output() goalCreatedEvent = new EventEmitter<Goal>();

	constructor() {
	}

	goalCreated(goal){
		if(goal){
			this.goalCreatedEvent.next(goal);
		}
	}	
}