import {Component, Injectable, OnInit} from 'angular2/core';
import {TodaysDate} from '../common/TodaysDate';
import {Calendar} from '../common/Calendar';
import {IDate} from '../interfaces/Date.Interface';
import {LocalGoalsService} from '../services/local-goals.service';
import {GoalInterface} from '../interfaces/Goal.Interface';

@Component({
	selector: 'goal-calendar',
	templateUrl: '/app/components/calendar.component.html',
	providers: [LocalGoalsService]
})

@Injectable()

export class CalendarComponent{
	private week: IDate[] ;
	private calendar;
	public goals: GoalInterface[];

	constructor(private _goalService: LocalGoalsService) { }

	ngOnInit(){
		this.calendar = new Calendar();
		this.week = this.calendar.getDates(4);
		this.getGoals();
		this.getGoalsStatus();
	}

	getGoals(){
		this._goalService.getTodaysGoals().then(
			goals=>{
				this.goals = goals;
			}
		);	
	}

	getGoalsStatus(){
		var goal: GoalInterface[] = [];
		this._goalService.getGoalsStatus(this.week).then(
			goals=>{
				this.goals = goals;
				console.dir(goals);
			}
		);
	}

	toggleGoalClick(goal, status) {
		console.log(goal);
		console.log(status);

		//toggle isComplete
		status.isComplete = !status.isComplete;
		goal.isComplete = status.isComplete;
		this._goalService.updateDailyStatus(goal, status.date);
	}
}