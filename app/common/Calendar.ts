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
		var date = new Date();
		date.setDate(date.getDate() - 6);

		var simpleDate = {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate()
		};

		
		var week:IDate[] = [];
		week.push(new SimpleDate(simpleDate));


		for(var i = 0; i < 6; i++){			
			simpleDate = this.getNextDate(simpleDate);
			week.push(new SimpleDate(simpleDate));
		}

		return week;
	}
}