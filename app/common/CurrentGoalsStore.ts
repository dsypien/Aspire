import {Goal} from "./Goal";

export class CurrentGoalsStore{
	get(){
		var goals = localStorage.getItem('goals');

		if (goals === null) {
			goals = { nextID: 1, items: [] };
		}
		else {
			goals = JSON.parse(goals);
		}

		return goals;
	}
	private _getGoalMapFromStore() {
		var map = localStorage.getItem('goalMap');

		if (map === null) {
			return null;
		}
		else {
			return JSON.parse(map);
		}
	}

	getByID(id:number): Goal{
		var goalsObj = this.get();
		var map = this._getGoalMapFromStore();
		var index = map[id];

		return goalsObj.items[index];
	}

	create(){

	}

	update(goals:Object){

	}
}