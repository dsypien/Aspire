import {GoalInterface} from '../interfaces/Goal.interface';

export class Goal implements GoalInterface{
	id: number;
	isComplete: boolean;
	name: string;
	status: any[];
	notes: string[];
	createDate: Date;
	numCompletions: number;
	longestStreak: any;

	constructor(id, isComplete, name){
		this.id = id;
		this.isComplete = isComplete;
		this.name = name;
		this.numCompletions = 0;
	}

	Clone(t:Goal){
		this.id = t.id;
		this.isComplete = t.isComplete;
		this.name = t.name;
	}
}