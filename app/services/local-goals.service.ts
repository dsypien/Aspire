import {Injectable} from 'angular2/core';
import {GoalServiceInterface} from '../interfaces/GoalService.Interface';
import {Goal} from '../common/Goal';

@Injectable()
export class LocalGoalsService implements GoalServiceInterface{
	private _isDirty: boolean = true;
	private _goals: { nextID: number, items: Array<any> };

	get(){		
		var goals = this._getGoalsObject();

		if (goals && goals.items.length > 0) {
			return Promise.resolve(goals.items);
		}
		else{
			return Promise.resolve(null);
		}
	}

	private _getGoalsObject(){
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

	private _updateGoalsObject(goals: Object){
		localStorage.setItem('goals', JSON.stringify(goals));
	}

	private _getGoalIndex(ary : Array<Goal>, value: number){
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

		if(index !== null){
			return ary[index];
		}
		else{
			return null;
		}
	}

	create(pGoal){
		var goals = this._getGoalsObject();

		pGoal.id = goals.nextID;
		goals.nextID++;
		goals.items.push(pGoal);

		this._updateGoalsObject(goals);

		this._isDirty = true;
	}
	
	update(pGoal){
		var goals = this._getGoalsObject();
		var goal = this._getGoalByID(goals.items, pGoal.id);

		// Do a deep copy
		// To Do : Should have a better way to do a deep copy on objects
		goal.name = pGoal.name;
		goal.isComplete = pGoal.isComplete;

		this._updateGoalsObject(goals);

		this._isDirty = true;
	}
	
	delete(id: number){
		var goals = this._getGoalsObject();
		var index = this._getGoalIndex(goals.items, id);

		if(index !== null){
			goals.items.splice(index, 1);
		}

		this._updateGoalsObject(goals);

		this._isDirty = true;
	}
}
