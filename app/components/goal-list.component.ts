import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {GoalItemComponent} from './goal-item.component';
import {CreateGoalComponent} from './create-goal.component';
import {OnInit, OnDestroy} from 'angular2/core';
import {GoalServiceInterface} from '../interfaces/GoalService.Interface';
import {GoalInterface} from '../interfaces/Goal.Interface';
import {Goal} from '../common/Goal';
import {DailyStatus} from '../common/DailyStatus';

@Component({
	selector: 'goal-list',
	templateUrl: '/app/components/goal-list.component.html',
	directives: [GoalItemComponent, CreateGoalComponent]
})

export class GoalListComponent{
	@Input() goals: Goal[];

	@Output() dirtyGoalList = new EventEmitter();
	@Output() getTodaysGoals = new EventEmitter();

	constructor() {
	}

	onGetTodaysGoals(){
		this.getTodaysGoals.next(null);
	}	

	onGoalDirty(){
		this.dirtyGoalList.next(null);
	}
}