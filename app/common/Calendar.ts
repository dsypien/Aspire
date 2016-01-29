export class Calendar{
	private months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
	getDates(num:number) : Date[]{
		var date = new Date();
		var numDays = num -1;
		var week:Date[] = [];

		date.setDate(date.getDate() - numDays);
		week.push(new Date(date.toString()));

		for(var i = 0; i < numDays; i++){
			date.setDate(date.getDate() + 1)
			week.push(new Date(date.toString()));
		}

		return week;
	}
}