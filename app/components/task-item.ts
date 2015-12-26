import {Component} from 'angular2/core'

@Component({
	selector: 'task-item',
	properties: ['task'],
	template: `
		<input type="checkbox"> {{task.name}}
	`
})

export class TaskItemComponent{
	name: string;
	isComplete: boolean;

	constructor(){
		this.name = "";
		this.isComplete = false;
	}
}