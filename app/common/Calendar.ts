import {TodaysDate} from './TodaysDate';
import {IDate} from '../interfaces/Date.interface';
import {SimpleDate} from '../common/SimpleDate';

export class Calendar{
	private months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	getDaysInMonth(month: number, year: number){
		return new Date(year, month, 0).getDate();
	}

	getMonthText(month: number){
		return this.months[month - 1];
	}

	private getPreviousDate(date: IDate){
		if(date.day === 1){
			// yesterday was last day of previous year
			if(date.month === 1){
				date.day = 31;
				date.month = 12;
				date.year--;
			}
			else{
				date.month--;
				date.day = this.getDaysInMonth(date.month, date.year);				
			}
		}
		else{
			date.day--;
		}

		return date;
	}

	private getNextDate(date: IDate){
		var daysInMonth = this.getDaysInMonth(date.month, date.year);

		if(date.day === daysInMonth){
			if(date.month === 12){
				date.day = 1;
				date.month = 1;
				date.year++;
			}
			else{
				date.day = 1;
				date.month++;
			}
		}
		else{
			date.day++;
		}

		return date;
	}

	// get dates for current week
	getDates() : IDate[]{
		var date = new TodaysDate();
		var week:IDate[] = [];
		week.push(new SimpleDate(date));


		for(var i = 0; i < 6; i++){			
			date = this.getNextDate(date);
			week.push(new SimpleDate(date));
		}

		return week;
	}
}