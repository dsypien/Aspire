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
	public goalName: string;

	constructor(private _localGoalService : LocalGoalsService){

	}

	onKeyUp(event){
		if(event.keyCode === 13 && this.goalName != ""){
			this.createGoal();
		}
	}

	createGoal(){
		var goal = new Goal(null, false, this.goalName);

		this._localGoalService.create(goal);
		this.goalCreated.emit('event');

		this.goalName = null;

	}
}