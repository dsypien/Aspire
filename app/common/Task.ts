import {TaskInterface} from '../interfaces/Task.interface';

export class Task implements TaskInterface{
	id: number;
	date: Date;
	isComplete: boolean;
	name: string;

	constructor(t:TaskInterface){
		this.id = t.id;
		this.date = t.date;
		this.isComplete = t.isComplete;
		this.name = t.name;
	}

	Clone(t:Task){
		this.id = t.id;
		this.date = t.date;
		this.isComplete = t.isComplete;
		this.name = t.name;
	}
}