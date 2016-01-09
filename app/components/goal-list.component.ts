import {Component} from 'angular2/core';
import {GoalItemComponent} from './goal-item.component';
import {CreateGoalComponent} from './create-goal.component';
import {OnInit} from 'angular2/core';
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

	constructor(private _goalService: LocalGoalsService) {}

	ngOnInit(){
		this.getGoals();
	}

	goalListUpdated(){
		this.getGoals();
	}

	getGoals(){
		this._goalService.getTodaysGoals().then(
			goals=> {
				console.log(goals);
				this.goals = goals
			}
		);
	}
	
}