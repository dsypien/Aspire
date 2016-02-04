export class DailyStatus{
	isComplete: boolean;
	id: number;
	date: Date;

	constructor(id, date, isComplete){
		this.date = date;
		this.id = id;
		this.isComplete = isComplete;
	}
}