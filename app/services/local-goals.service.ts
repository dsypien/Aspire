import {Injectable} from 'angular2/core';
import {GoalServiceInterface} from '../interfaces/GoalService.Interface';
import {Goal} from '../common/Goal';

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
		return localStorage.getItem('dailyActivity');
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

	private _getGoalIndex(ary: Array<Goal>, value: number) {
		var aryLength = ary.length;
		for (var i = 0; i < aryLength; i++) {
			if (ary[i].id === value) {
				return i;
			}
		}

		return null;
	}

	private _getGoalByID(ary: Array<Goal>, value: number) {
		var index = this._getGoalIndex(ary, value);

		if (index !== null) {
			return ary[index];
		}
		else {
			return null;
		}
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

		// Update Daily Activity
		var dailyActivity = this._getDailyActivtyFromStore();
		var date = new Date();
		var year = date.getFullYear().toString();
		var month = (date.getMonth() + 1).toString();
		var day = date.getDate().toString();

		if (dailyActivity === null) {
			dailyActivity = {};
			dailyActivity[year] = {};
			dailyActivity[year][month] = {};
			dailyActivity[year][month][day] = {};
		}
		
		dailyActivity[year][month][day][pGoal.id] = pGoal;

		this._updateGoalsInStore(goals);
		this._updateMapGoalsInStore(map);
		this._updateCurrentGoalsInStore(currentGoals);
		this._updateDailyActivityInStore(dailyActivity);

		this._isDirty = true;
	}
	
	update(pGoal){
		var goals = this._getGoalsFromStore();
		// change how we get goal 
		var goal = this._getGoalByID(goals.items, pGoal.id);

		goal.name = pGoal.name;

		this._updateGoalsInStore(goals);

		this._isDirty = true;
	}
	
	//Deprecated
	delete(id: number){
		// var goals = this._getGoalsFromStore();
		// var index = this._getGoalIndex(goals.items, id);

		// if(index !== null){
		// 	goals.items.splice(index, 1);
		// }

		// this._updateGoalsInStore(goals);

		// this._isDirty = true;
	}

	archive(id){
 		//-->  remove from currentGoals
	}

	updateTodaysGoal(pGoal){
		//TODO

		// update dailyActivity for todays date
	}

	getTodaysGoals(){
		//TODO

		//get CurrentGoals 
		//--> details from goal table 
		//--> daily activity to see if complete
	}
}
