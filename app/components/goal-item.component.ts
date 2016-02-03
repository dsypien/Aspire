import {Component, EventEmitter, Output, Injectable} from 'angular2/core';
import {Goal} from '../common/Goal';

@Component({
	selector: 'goal-item',
	inputs: ['goal'],
	templateUrl: '/app/components/goal-item.component.html'
})

@Injectable()

export class GoalItemComponent{
	public goal: Goal;

	@Output() updateDailyStatus = new EventEmitter<Goal>();
	@Output() updateGoal = new EventEmitter<Goal>();
	@Output() archiveGoal = new EventEmitter<Goal>();

	constructor(){
	}

	update() {
		//this._localGoalService.update(this.goal);
		this.updateGoal.emit(this.goal);
	}

	archive(){
		//this._localGoalService.archive(this.goal.id);
		this.archiveGoal.emit(this.goal);
	}

	toggleTodaysGoal(event) {
		//this.goal.isComplete = event.srcElement.checked;
		//this._localGoalService.updateDailyStatus(this.goal, null);
		this.updateDailyStatus.emit(this.goal);
	}
}