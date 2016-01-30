export class Calendar{
	private months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	getDaysInMonth(month: number, year: number){
		return new Date(year, month, 0).getDate();
	}

	getMonthText(month: number){
		return this.months[month];
	}

	private getNextDate(date: Date): Date{
		date.setDate(date.getDate() + 1)
		return date;
	}

	// get dates for current week
	getDates(num:number, endDate:Date) : Date[]{
		var numDays = num -1;
		var week:Date[] = [];

		endDate.setDate(endDate.getDate() - numDays);
		week.push(new Date(endDate.toString()));

		for(var i = 0; i < numDays; i++){
			endDate.setDate(endDate.getDate() + 1)
			week.push(new Date(endDate.toString()));
		}

		return week;
	}
}