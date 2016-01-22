import {IDate} from '../interfaces/Date.interface';

export class SimpleDate implements IDate{
	year: number;
	month: number;
	day: number;

	constructor(date: IDate){
		this.year = date.year;
		this.month = date.month;
		this.day = date.day;
	}
}