import {Component, EventEmitter, Output} from 'angular2/core';
import {LocalGoalsService} from '../services/local-goals.service';
import {GoalInterface} from '../interfaces/Goal.interface';

@Component({
	selector: 'create-goal',
	templateUrl: '/app/components/create-goal.component.html'
})

export class CreateGoalComponent{
	@Output() goalCreated = new EventEmitter();

	constructor(private _localGoalService : LocalGoalsService){

	}

	createGoal(goalName){
		var goal = {
			isComplete: false,
			name: goalName
		}

		this._localGoalService.create(goal);
		this.goalCreated.emit('event');

		goalName.value = null;

	}
}