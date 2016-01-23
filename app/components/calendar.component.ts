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

	ngOnInit(){
		this.calendar = new Calendar();
		this.week = this.calendar.getDates();
		this.getGoals();
	}

	getGoals(){
		this._goalService.getTodaysGoals().then(
			goals=>{
				this.goals = goals;
			}
		);	
	}

	constructor(private _goalService: LocalGoalsService){}
}