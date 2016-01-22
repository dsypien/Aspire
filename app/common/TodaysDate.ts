import {IDate} from '../interfaces/Date.Interface';

export class TodaysDate implements IDate{
	year: number;
	month: number;
	day: number;

	constructor(){
		var date = new Date();
		this.year = date.getFullYear();
		this.month = (date.getMonth() + 1);
		this.day = date.getDate();
	}
}