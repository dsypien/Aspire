import {Component, Injectable, OnInit, Input, Output, EventEmitter} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {LocalGoalsService} from '../services/local-goals.service';
import {GoalInterface} from '../interfaces/Goal.Interface';
import {DailyStatus} from '../common/DailyStatus';

@Component({
	selector: 'goal-calendar',
	templateUrl: '/app/components/calendar.component.html',
	providers: [LocalGoalsService],
	directives: [NgClass]
})

@Injectable()

export class CalendarComponent{
	@Input() dates: Date[];
	@Input() goals: GoalInterface[];	
	@Input() dateLabel: string;
	@Output() previousEvent = new EventEmitter<number>();
	@Output() nextEvent = new EventEmitter<number>();
	@Output() dirtyGoals = new EventEmitter();

	constructor(private _goalService: LocalGoalsService) { 
	}

	isToday(date) : boolean{
		var todaysDate = new Date();
		return date.getFullYear() === todaysDate.getFullYear() &&
			   date.getMonth() === todaysDate.getMonth() &&
			   date.getDate() === todaysDate.getDate();
	}

	private previous(){
		this.previousEvent.next(0);
	}

	private next(){
		this.nextEvent.next(0);
	}

	private toggleGoalClick(goal, status) {
		status.isComplete = !status.isComplete;
		var dailyStatus = new DailyStatus(goal.id, status.date, status.isComplete);
		this._goalService.updateDailyStatus(dailyStatus);

		this.dirtyGoals.next(null);
	}
}