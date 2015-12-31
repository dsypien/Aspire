import {Component} from 'angular2/core';
import {Task} from '../interfaces/Task.Interface';

@Component({
	selector: 'task-item',
	inputs: ['task'],
	template: `
		<div class="task-item">
			<input type="checkbox">
			<input [(ngModel)]="task.name" (change)="onChange()"/>
		</div>
	`
})

export class TaskItemComponent{
	public task: Task;

	constructor(){
		
	}

	onChange(){
		console.log(this.task.name);
	}
}