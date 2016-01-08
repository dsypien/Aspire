export class TodaysDate{
	year: string;
	month: string;
	day: string;

	constructor(){
		var date = new Date();
		this.year = date.getFullYear().toString();
		this.month = (date.getMonth() + 1).toString();
		this.day = date.getDate().toString();
	}
}