import {Component, Input} from 'angular2/core';

@Component({
	selector: 'notify-bar',
	templateUrl: '/app/components/notifyBar.component'
})

export class notifyBar{
	@Input() title: string;
	@Input() message: string;
}