import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
	selector: 'notify-bar',
	templateUrl: '/app/components/notifyBar.component.html',
	directives: [NgClass]
})

export class NotifyBar{
	@Input() title: string;
	@Input() message: string;
	public isVisible: boolean = false;
}