import {Component, EventEmitter, Output, Injectable} from 'angular2/core';
import {Goal} from '../common/Goal';
import {LocalGoalsService} from '../services/local-goals.service';

@Component({
	selector: 'goal-item',
	inputs: ['goal'],
	templateUrl: '/app/components/goal-item.component.html',
	providers: [LocalGoalsService]
})

@Injectable()

export class GoalItemComponent{
	public goal: Goal;

	@Output() updateDailyStatus = new EventEmitter<Goal>();
	@Output() archiveGoal = new EventEmitter<Goal>();

	constructor(private _localGoalService : LocalGoalsService){
	}

	update() {
		this._localGoalService.update(this.goal);
	}

	archive(){
		this._localGoalService.archive(this.goal.id);
		//  TODO : Need to remove from goals object
	}

	toggleTodaysGoal(event) {
		//this.goal.isComplete = event.srcElement.checked;
		//this._localGoalService.updateDailyStatus(this.goal, null);
		this.updateDailyStatus.emit(this.goal);
	}
}