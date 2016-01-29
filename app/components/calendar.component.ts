import {Component, Injectable, OnInit} from 'angular2/core';
import {Calendar} from '../common/Calendar';
import {LocalGoalsService} from '../services/local-goals.service';
import {GoalInterface} from '../interfaces/Goal.Interface';

@Component({
	selector: 'goal-calendar',
	templateUrl: '/app/components/calendar.component.html',
	providers: [LocalGoalsService]
})

@Injectable()

export class CalendarComponent{
	private dates: Date[];
	private calendar;
	private goals: GoalInterface[];
	private screenWidth;
	private endDate: Date;

	private SMALL : number;
	private MEDIUM : number;
	private LARGE : number;
	private XLARGE : number;

	constructor(private _goalService: LocalGoalsService) { 
		this.SMALL = 3;
		this.MEDIUM = 5;
		this.LARGE = 7;
		this.XLARGE = 10;

		// this.endDate = 
	}

	ngOnInit(){
		this.calendar = new Calendar();
		this.onResize();
	}

	private onResize(){
		var size = this.getWindowSize();

		if (this.screenWidth !== size) {
			this.dates = this.calendar.getDates(size);
			this.getGoals();
			this.getGoalsStatus();
		}
		
		this.screenWidth = size;
	}

	private getWindowSize(){
		var width = window.innerWidth;
		var size;
		console.log(width);

		if (width < 490) {
			size = this.SMALL;
		}
		else if (width < 600) {
			size = this.MEDIUM;
		}
		else if (width < 993) {
			size = this.LARGE;
		}
		else {
			size = this.XLARGE;
		}

		return size;
	}

	private getGoals(){
		this._goalService.getTodaysGoals().then(
			goals=>{
				this.goals = goals;
			}
		);	
	}

	private getGoalsStatus(){
		var goal: GoalInterface[] = [];
		this._goalService.getGoalsStatus(this.dates).then(
			goals=>{
				this.goals = goals;
				console.dir(goals);
			}
		);
	}

	private toggleGoalClick(goal, status) {
		status.isComplete = !status.isComplete;
		goal.isComplete = status.isComplete;
		this._goalService.updateDailyStatus(goal, status.date);
	}

	goToPreviousDates(){
		console.log("Go to previous dates");
	}

	goToNextDates() {
		console.log("Go to next dates");
	}
}