import {Component, EventEmitter, Output, Injectable} from 'angular2/core';
import {GoalInterface} from '../interfaces/Goal.Interface';
import {LocalGoalsService} from '../services/local-goals.service';

@Component({
	selector: 'goal-item',
	inputs: ['goal'],
	templateUrl: '/app/components/goal-item.component.html'
})

@Injectable()

export class GoalItemComponent{
	public goal: GoalInterface;

	@Output() dirty = new EventEmitter();

	constructor(private _localGoalService : LocalGoalsService){}

	update() {
		this._localGoalService.update(this.goal);
	}

	archive(){
		this._localGoalService.archive(this.goal.id);
		this.dirty.emit('event');
	}

	updateTodaysGoal(event) {
		this.goal.isComplete = event.srcElement.checked;
		this._localGoalService.updateDailyStatus(this.goal, null);
	}
}