import {Component, Injectable, OnInit, Input, Output, EventEmitter} from 'angular2/core';
import {LocalGoalsService} from '../services/local-goals.service';
import {GoalInterface} from '../interfaces/Goal.Interface';

@Component({
	selector: 'goal-calendar',
	templateUrl: '/app/components/calendar.component.html',
	providers: [LocalGoalsService]
})

@Injectable()

export class CalendarComponent{
	@Input() dates: Date[];	
	@Input() goals: GoalInterface[];	
	@Input() dateLabel: string;
	@Output() previousEvent: EventEmitter<number>;
	@Output() nextEvent: EventEmitter<number>;

	constructor(private _goalService: LocalGoalsService) { 
		this.previousEvent = new EventEmitter<number>();
		this.nextEvent = new EventEmitter<number>();
	}

	@Input() onGoalStatusUpdate(){
		
	}

	private previous(){
		this.previousEvent.next(0);
	}

	private next(){
		this.nextEvent.next(0);
	}

	private toggleGoalClick(goal, status) {
		status.isComplete = !status.isComplete;
		goal.isComplete = status.isComplete;
		this._goalService.updateDailyStatus(goal, status.date);
	}
}