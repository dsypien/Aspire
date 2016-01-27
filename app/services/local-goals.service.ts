import {Injectable} from 'angular2/core';
import {GoalServiceInterface} from '../interfaces/GoalService.Interface';
import {GoalInterface} from '../interfaces/Goal.Interface';
import {IDate} from '../interfaces/Date.Interface';
import {Goal} from '../common/Goal';
import {TodaysDate} from '../common/TodaysDate';
import {CurrentGoalsStore} from '../common/CurrentGoalsStore';
import {GoalStore} from '../common/GoalsStore';
import {DailyActivityStore} from '../common/DailyActivityStore';

@Injectable()
export class LocalGoalsService implements GoalServiceInterface{
	private _isDirty: boolean = true;
	private _goals: { nextID: number, items: Array<any> };

	get(){		
		var goals = GoalStore.get();

		if (goals && goals.items.length > 0) {
			return Promise.resolve(goals.items);
		}
		else{
			return Promise.resolve(null);
		}
	}

	create(pGoal : Goal){
		var goals = GoalStore.get()
		var map = GoalStore.getGoalMap();
		var currentGoals = CurrentGoalsStore.get();

		// Update Map
		if (!map) {
			map = {};
		}
		map[goals.nextID] = goals.items.length;

		// Update Current Goals
		if(!currentGoals){
			currentGoals = {};
		}
		currentGoals[goals.nextID] = "";

		//Append ID to goal 
		pGoal.id = goals.nextID;
		goals.items.push(pGoal);
		goals.nextID++;

		this.updateDailyStatus(pGoal, null);
		GoalStore.update(goals);
		GoalStore.updateGoalMap(map);
		CurrentGoalsStore.update(currentGoals);

		this._isDirty = true;
	}
	
	update(pGoal:GoalInterface){
		var goals = GoalStore.get();
		var map = GoalStore.getGoalMap();
		var goal = goals.items[map[pGoal.id]];

		goal.name = pGoal.name;

		GoalStore.update(goals);

		this._isDirty = true;
	}

	archive(id:number){
		var currentGoals = CurrentGoalsStore.get();
		
		delete currentGoals[id];
		CurrentGoalsStore.update(currentGoals);
	}

	updateDailyStatus(pGoal:GoalInterface, d:IDate){
		var dailyActivity = DailyActivityStore.get();

		if(!d){
			d = new TodaysDate();
		}

		if (dailyActivity === null) {
			dailyActivity = {};
		}

		if (dailyActivity[d.year] === undefined){
		dailyActivity[d.year] = {};
		}

		if (dailyActivity[d.year][d.month] === undefined){
			dailyActivity[d.year][d.month] = {};
		}

		if (dailyActivity[d.year][d.month][d.day] === undefined){
			dailyActivity[d.year][d.month][d.day] = {};
		}

		dailyActivity[d.year][d.month][d.day][pGoal.id] = {
			isComplete: pGoal.isComplete
		};

		DailyActivityStore.update(dailyActivity);
	}

	getGoalsStatus(days: IDate[]) {
		var dailyActivity = DailyActivityStore.get();
		var goals: GoalInterface[][];

		return new Promise<GoalInterface[]>((resolve, reject) => {
			this.getTodaysGoals().then(
				todaysGoals=> {
					for (var goali = 0; goali < todaysGoals.length; goali++) {
						for (var dayi = 0; dayi < days.length; dayi++) {
							var goal = todaysGoals[goali];
							var date = days[dayi];
							
							goal.status = goal.status || [];

							if (dailyActivity === undefined) {
								dailyActivity = {};
							}

							if (dailyActivity[date.year] === undefined) {
								dailyActivity[date.year] = {};
							}

							if (dailyActivity[date.year][date.month] === undefined) {
								dailyActivity[date.year][date.month] = {};
							}

							if (dailyActivity[date.year][date.month][date.day] === undefined) {
								dailyActivity[date.year][date.month][date.day] = {};
							}

							if (dailyActivity[date.year][date.month][date.day][goal.id] === undefined) {
								dailyActivity[date.year][date.month][date.day][goal.id] = false;
							}

							if(dailyActivity[date.year][date.month][date.day][goal.id].isComplete){
								goal.status.push({ date: date, isComplete: true });
							}
							else{
								goal.status.push({ date: date, isComplete: false });
							}
						}
					}
							
					return Promise.resolve(todaysGoals);
				}
			);
		});
	}

	getTodaysGoals() :Promise<Goal[]>{
		var currentGoals = CurrentGoalsStore.get();
		var dailyActivity = DailyActivityStore.get();
		var map = GoalStore.getGoalMap();
		var goalsList = GoalStore.get().items;

		var currentGoalIds = Object.keys(currentGoals);
		var numGoals = currentGoalIds.length;

		var d = new TodaysDate();
		var todaysGoals:Goal[] = [];

		for (var i = 0; i < numGoals; i++){
			var curIdString = currentGoalIds[i].toString();

			if(dailyActivity === undefined){
				dailyActivity = {};
			}

			if(dailyActivity[d.year] === undefined){
				dailyActivity[d.year] = {};
			}

			if (dailyActivity[d.year][d.month] === undefined) {
				dailyActivity[d.year][d.month] = {};
			}

			if (dailyActivity[d.year][d.month][d.day] === undefined) {
				dailyActivity[d.year][d.month][d.day] = {};
			}

			// Retrieve goal
			var curGoal = goalsList[map[curIdString]];

			// Copy activity properties if any logged for today
			if(dailyActivity[d.year][d.month][d.day][curIdString] !== undefined){
				var target = dailyActivity[d.year][d.month][d.day][curIdString];
				for (var k in target) {
					if (target.hasOwnProperty(k)) {
						curGoal[k] = target[k];
					}
				}
			}
			
			this.updateDailyStatus(curGoal, d);
			todaysGoals.push(curGoal);
		}

		return Promise.resolve(todaysGoals);
	}
}
