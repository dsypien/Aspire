import {Component, EventEmitter, Output} from 'angular2/core';
import {LocalGoalsService} from '../services/local-goals.service';
import {GoalInterface} from '../interfaces/Goal.interface';
import {Goal} from '../common/Goal';

@Component({
	selector: 'create-goal',
	templateUrl: '/app/components/create-goal.component.html'
})

export class CreateGoalComponent{
	@Output() goalCreated = new EventEmitter();

	constructor(private _localGoalService : LocalGoalsService){

	}

	onKeyUp(event, goalName){
		if(event.keyCode === 13 && goalName != ""){
			this.createGoal(goalName);
		}
	}

	createGoal(goalName){
		var goal = new Goal(null, false, goalName);

		this._localGoalService.create(goal);
		this.goalCreated.emit('event');

		goalName.value = null;

	}
}