export class Calendar{
	months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	getDaysInMonth(month: number, year: number){
		return new Date(year, month, 0).getDate();
	}

	getMonthText(month: number){
		return this.months[month - 1];
	}
}