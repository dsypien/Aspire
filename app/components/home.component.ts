import {Component, Input} from 'angular2/core';
import {RouterOutlet} from 'angular2/router';
import {CalendarComponent} from './calendar.component';
import {GoalListComponent} from './goal-list.component';
import {Calendar} from '../common/Calendar';
import {Goal} from '../common/Goal';
import {LocalGoalsService} from '../services/local-goals.service';

@Component({
    selector: 'home',
    directives: [GoalListComponent, CalendarComponent, RouterOutlet],
    templateUrl: '/app/components/home.component.html',
    providers: [LocalGoalsService]
})

export class HomeComponent {
	@Input() goals: Goal[];

	private SMALL: number;
	private MEDIUM: number;
	private LARGE: number;
	private XLARGE: number;
	
	private calendar;
	private dates: Date[];	
	private startDate: Date;
	private endDate: Date;
	private screenWidth;

	private dateLabel: string;

	constructor(private _localGoalService : LocalGoalsService) {
		// if logged in use remote-goals.service
		// otherwise use local-goals.service
		this.SMALL = 3;
		this.MEDIUM = 5;
		this.LARGE = 7;
		this.XLARGE = 10;
	}

	ngOnInit() {
		this.endDate = new Date();
		this.calendar = new Calendar();
		this.onResize();
	}

	private onResize() {
		var size = this.getWindowSize();

		if (this.screenWidth !== size) {
			this.screenWidth = size;
			this.getGoalData();
		}
	}

	private getGoalData() {
		this.dates = this.calendar.getDates(this.screenWidth, this.endDate);
		this.getGoals();
		this.getGoalsStatus();
	}

	private getWindowSize() {
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

	createGoal(goal){
		if(goal){
			this._localGoalService.create(goal);
		}
	}

	updateDailyStatus(dailyStatus){
		this._localGoalService.updateDailyStatus(dailyStatus);
	}

	updateGoal(goal){
		this._localGoalService.update(goal);
	}

	archiveGoal(goal){
		if(goal){
			this._localGoalService.archive(goal.id);
		}		
	}

	private getGoals() {
		this._localGoalService.getTodaysGoals().then(
			goals=> {
				this.goals = goals;
			}
		);
	}

	private getGoalsStatus() {
		var goal: Goal[] = [];
		this._localGoalService.getGoalsStatus(this.dates).then(
			goals=> {
				this.goals = goals;
				this.updateDateLabel();
			}
		);
	}

	private updateDateLabel(){
		if (this.goals && this.goals.length && this.goals[0].status.length) {
			this.startDate = this.goals[0].status[0].date;
		}

		this.dateLabel = this.getStartDateText()
			+ " - "
			+ this.getEndDateText();
	}

	private getStartDateText() :string{
		if(this.startDate){
			return this.calendar.getMonthText(this.startDate.getMonth()) +
				" " + this.startDate.getDate() +
				", " + this.startDate.getFullYear();	
		}
		return "";
	}

	private getEndDateText() :string{
		if (this.startDate) {
			return this.calendar.getMonthText(this.endDate.getMonth()) +
				" " + this.endDate.getDate() +
				", " + this.endDate.getFullYear();
		}
		else{
			return "";
		}
	}

	goToPreviousDates() {
		this.endDate.setDate(this.endDate.getDate() - this.screenWidth);
		this.getGoalData();
	}

	goToNextDates() {
		this.endDate.setDate(this.endDate.getDate() + this.screenWidth);
		this.getGoalData();
	}
}