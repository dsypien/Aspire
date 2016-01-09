import {Goal} from "./Goal";

export class CurrentGoalsStore{
	static get(){
		var current = localStorage.getItem('currentGoals');

		if (current === null) {
			return null;
		}
		else {
			return JSON.parse(current);
		}
	}

	static update(current: Object){
		localStorage.setItem('currentGoals', JSON.stringify(current));
	}
}