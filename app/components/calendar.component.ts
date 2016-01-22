import {Component, Injectable, OnInit} from 'angular2/core';
import {TodaysDate} from '../common/TodaysDate';
import {Calendar} from '../common/Calendar';
import {IDate} from '../interfaces/Date.Interface';

@Component({
	selector: 'goal-calendar',
	templateUrl: '/app/components/calendar.component.html'
})

@Injectable()

export class CalendarComponent{
	private week: IDate[] ;
	private calendar;

	ngOnInit(){
		this.calendar = new Calendar();
		this.week = this.calendar.getDates();
	}

	constructor(){

	}
}