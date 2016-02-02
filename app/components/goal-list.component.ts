import {Component} from 'angular2/core';
import {GoalItemComponent} from './goal-item.component';
import {CreateGoalComponent} from './create-goal.component';
import {OnInit, OnDestroy} from 'angular2/core';
import {LocalGoalsService} from '../services/local-goals.service';
import {GoalServiceInterface} from '../interfaces/GoalService.Interface';
import {GoalInterface} from '../interfaces/Goal.Interface';

@Component({
	selector: 'goal-list',
	templateUrl: '/app/components/goal-list.component.html',
	directives: [GoalItemComponent, CreateGoalComponent],
	providers: [LocalGoalsService]
})

export class GoalListComponent{
	public goals: GoalInterface[];
	private subscription: any;

	constructor(private _goalService: LocalGoalsService) {
		this.subscription = this._goalService.getUpdateEventEmitter()
			.subscribe(item => this.goalUpdateEvent);
	}

	goalUpdateEvent(value: string){
		console.log("successfull event captured in goal list");
	}

	ngOnInit(){
		this.getGoals();
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	goalListUpdated(){
		this.getGoals();
	}

	getGoals(){
		this._goalService.getTodaysGoals().then(
			goals=> {
				console.log(goals);
				this.goals = goals;
			}
		);
	}
	
}