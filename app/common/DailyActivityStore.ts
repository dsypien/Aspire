import {Goal} from "./Goal";

export class DailyActivityStore {
	static get(){
		var dailyActivity = localStorage.getItem('dailyActivity');

		if (dailyActivity === null) {
			return null;
		}
		else {
			return JSON.parse(dailyActivity);
		}
	}

	static update(value: Object){
		localStorage.setItem('dailyActivity', JSON.stringify(value));	
	}
}