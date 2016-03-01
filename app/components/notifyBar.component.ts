import {Component, Input} from 'angular2/core';

@Component({
	selector: 'notify-bar',
	templateUrl: '/app/components/notifyBar.component.html'
})

export class NotifyBar{
	@Input() title: string;
	@Input() message: string;
}