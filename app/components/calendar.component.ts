import {Component, Injectable, OnInit, OnDestroy} from 'angular2/core';
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
	private startDate: Date;
	private endDate: Date;
	private dateLabel: string;

	private SMALL : number;
	private MEDIUM : number;
	private LARGE : number;
	private XLARGE : number;
	item: string = "";

	constructor(private _goalService: LocalGoalsService) { 
		this.SMALL = 3;
		this.MEDIUM = 5;
		this.LARGE = 7;
		this.XLARGE = 10;
	}

	ngOnInit(){
		this.endDate = new Date();
		this.calendar = new Calendar();
		this.onResize();
	}

	private getStartDateText(){
		return this.calendar.getMonthText(this.startDate.getMonth()) +
			" " + this.startDate.getDate() +
			", " + this.startDate.getFullYear();
	}

	private getEndDateText(){
		return this.calendar.getMonthText(this.endDate.getMonth()) +
			" " + this.endDate.getDate() +
			", " + this.endDate.getFullYear();
	}

	private onResize(){
		var size = this.getWindowSize();

		if (this.screenWidth !== size) {
			this.screenWidth = size;
			this.getGoalData();
		}
	}

	private getGoalData(){
		this.dates = this.calendar.getDates(this.screenWidth, this.endDate);
		this.getGoals();
		this.getGoalsStatus();
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
			goals=> {
				this.goals = goals;
				this.startDate = goals[0].status[0].date;
				this.dateLabel = this.getStartDateText() +
								" - " +
								this.getEndDateText();
			}
		);
	}

	private toggleGoalClick(goal, status) {
		status.isComplete = !status.isComplete;
		goal.isComplete = status.isComplete;
		this._goalService.updateDailyStatus(goal, status.date);
	}

	goToPreviousDates(){
		this.endDate.setDate(this.endDate.getDate() - this.screenWidth);
		this.getGoalData();
	}

	goToNextDates() {
		this.endDate.setDate(this.endDate.getDate() + this.screenWidth);
		this.getGoalData();
	}
}