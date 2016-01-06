import {Component, EventEmitter, Output, Injectable} from 'angular2/core';
import {GoalInterface} from '../interfaces/Goal.Interface';
//import {LocalGoalsService} from '../services/local-goals.service';
import {GoalServiceInterface} from '../interfaces/GoalService.interface'

@Component({
	selector: 'goal-item',
	inputs: ['goal'],
	templateUrl: '/app/components/goal-item.component.html'
})

@Injectable()

export class GoalItemComponent{
	public goal: GoalInterface;

	@Output() dirty = new EventEmitter();

	constructor(private _localGoalService : GoalServiceInterface){}

	update(){
		this._localGoalService.update(this.goal);
	}

	delete(){
		this._localGoalService.delete(this.goal.id);
		this.dirty.emit('event');
	}

	updateComplete(event) {
		this.goal.isComplete = event.srcElement.checked;
		this._localGoalService.update(this.goal);
	}
}