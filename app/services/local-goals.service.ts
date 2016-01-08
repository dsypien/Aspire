import {Injectable} from 'angular2/core';
import {GoalServiceInterface} from '../interfaces/GoalService.Interface';
import {Goal} from '../common/Goal';
import {TodaysDate} from '../common/TodaysDate';

@Injectable()
export class LocalGoalsService implements GoalServiceInterface{
	private _isDirty: boolean = true;
	private _goals: { nextID: number, items: Array<any> };

	private _getGoalsFromStore() {
		if (this._isDirty) {
			var goals = localStorage.getItem('goals');

			if (goals === null) {
				this._goals = { nextID: 1, items: [] };
			}
			else {
				this._goals = JSON.parse(goals);
			}

			this._isDirty = false;
		}

		return this._goals;
	}

	private _getGoalMapFromStore(){
		var map = localStorage.getItem('goalMap');

		if(map === null){
			return null;
		}
		else{
			return JSON.parse(map);
		}
	}

	private _getCurrentGoalsFromStore(){
		var current = localStorage.getItem('currentGoals');

		if(current === null){
			return null;
		}
		else{
			return JSON.parse(current);
		}
	}

	private _getDailyActivtyFromStore(){
		var dailyActivity = localStorage.getItem('dailyActivity');

		if(dailyActivity === null){
			return null;
		}
		else{
			return JSON.parse(dailyActivity);
		}
	}

	private _getGoalByID(index: number){
		this._getGoalsFromStore();
		var map = this._getGoalMapFromStore();

		return map[index];
	}

	private _getGoalIndex(ary: Array<Goal>, value: number) {
		var aryLength = ary.length;
		for (var i = 0; i < aryLength; i++) {
			if (ary[i].id === value) {
				return i;
			}
		}

		return null;
	}

	private _updateGoalsInStore(goals: Object) {
		localStorage.setItem('goals', JSON.stringify(goals));
	}

	private _updateMapGoalsInStore(map: Object){
		localStorage.setItem('goalMap', JSON.stringify(map));
	}

	private _updateCurrentGoalsInStore(current: Object) {
		localStorage.setItem('currentGoals', JSON.stringify(current));
	}

	private _updateDailyActivityInStore(value: Object){
		localStorage.setItem('dailyActivity', JSON.stringify(value));
	}

	get(){		
		var goals = this._getGoalsFromStore();

		if (goals && goals.items.length > 0) {
			return Promise.resolve(goals.items);
		}
		else{
			return Promise.resolve(null);
		}
	}

	create(pGoal : Goal){
		var goals = this._getGoalsFromStore();
		var map = this._getGoalMapFromStore();
		var currentGoals = this._getCurrentGoalsFromStore();

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

		this.updateTodaysGoal(pGoal);
		this._updateGoalsInStore(goals);
		this._updateMapGoalsInStore(map);
		this._updateCurrentGoalsInStore(currentGoals);

		this._isDirty = true;
	}
	
	update(pGoal){
		var goals = this._getGoalsFromStore();
		var goal = this._getGoalByID(pGoal.id);

		goal.name = pGoal.name;

		this._updateGoalsInStore(goals);

		this._isDirty = true;
	}

	archive(id:number){
		var currentGoals = this._getCurrentGoalsFromStore();

		delete currentGoals[id];
	}

	updateTodaysGoal(pGoal){
		var dailyActivity = this._getDailyActivtyFromStore();
		var d = new TodaysDate();

		if (dailyActivity === null) {
			dailyActivity = {};
			dailyActivity[d.year] = {};
			dailyActivity[d.year][d.month] = {};
			dailyActivity[d.year][d.month][d.day] = {};
		}

		dailyActivity[d.year][d.month][d.day][pGoal.id] = {
			isComplete: pGoal.isComplete
		};

		this._updateDailyActivityInStore(dailyActivity);
	}

	getTodaysGoals(){
		var currentGoals = this._getCurrentGoalsFromStore();
		var dailyActivity = this._getDailyActivtyFromStore();
		var map = this._getGoalMapFromStore();
		var goalsList = this._getGoalsFromStore().items;

		var currentGoalIds = Object.keys(currentGoals);
		var numGoals = currentGoalIds.length;

		var d = new TodaysDate();
		var todaysGoals = [];

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
			
			todaysGoals.push(curGoal);
		}

		return todaysGoals;
	}
}
