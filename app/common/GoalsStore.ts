import {Goal} from "./Goal";
	
export class GoalStore{
	static get() {
		var goals = localStorage.getItem('goals');

		if (goals === null) {
			goals = { nextID: 1, items: [] };
		}
		else {
			goals = JSON.parse(goals);
		}

		return goals;
	}

	static update(goals){
		localStorage.setItem('goals', JSON.stringify(goals));
	}

	static getGoalMap() {
		var map = localStorage.getItem('goalMap');

		if (map === null) {
			return null;
		}
		else {
			return JSON.parse(map);
		}
	}

	static updateGoalMap(map){
		localStorage.setItem('goalMap', JSON.stringify(map));
	}
}
	