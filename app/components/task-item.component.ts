import {Component} from 'angular2/core';
import {Task} from '../interfaces/Task.Interface';

@Component({
	selector: 'task-item',
	inputs: ['task'],
	template: `
		<div class="task-item">
			<input type="checkbox">
			<input #tasktxt [(ngModel)]="task.name" (keyup)="onChange(tasktxt)"/>
		</div>
	`
})

export class TaskItemComponent{
	public task: Task;

	constructor(){
		
	}

	onChange(tasktxt){
		console.log(this.task.name);
		console.log(tasktxt.value);
	}
}