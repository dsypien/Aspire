import {Component, EventEmitter, Output, Injectable} from 'angular2/core';
import {Goal} from '../common/Goal';
import {DailyStatus} from '../common/DailyStatus';
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
	private goalStatus : boolean;

	@Output() dirtyGoal = new EventEmitter();
	@Output() getTodaysGoals = new EventEmitter();

	constructor(private _localGoalService : LocalGoalsService){
	}

	ngOnInit(){
		this.goalStatus = this.goal.isComplete;
	}

	update() {
		this._localGoalService.update(this.goal);
	}

	archive(){
		this._localGoalService.archive(this.goal.id);
		this.dirtyGoal.next(null);
	}

	toggleTodaysGoal(event) {
		var date = new Date();
		var dailyStatus = new DailyStatus(this.goal.id, date, !this.goalStatus);

		this._localGoalService.updateDailyStatus(dailyStatus);
		this.getTodaysGoals.next(null);
	}
}