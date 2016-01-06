import {GoalInterface} from '../interfaces/Goal.interface';

export class Goal implements GoalInterface{
	id: number;
	date: Date;
	isComplete: boolean;
	name: string;

	constructor(t:GoalInterface){
		this.id = t.id;
		this.date = t.date;
		this.isComplete = t.isComplete;
		this.name = t.name;
	}

	Clone(t:Goal){
		this.id = t.id;
		this.date = t.date;
		this.isComplete = t.isComplete;
		this.name = t.name;
	}
}