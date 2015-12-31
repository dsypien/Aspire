import {Component} from 'angular2/core';
import {Task} from '../interfaces/Task.Interface';
import {LocalTasksService} from '../services/local-tasks.service';

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

	constructor(private _localTaskService : LocalTasksService){}

	onChange(tasktxt){
		this._localTaskService.updateTask(this.task);
	}
}