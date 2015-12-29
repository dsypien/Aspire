import {Component} from 'angular2/core'

@Component({
	selector: 'task-item',
	properties: ['task'],
	template: `
		<div class="task-item">
			<label><input type="checkbox">{{task.name}}</label>
		</div>
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