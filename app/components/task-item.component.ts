import {Component, EventEmitter, Output} from 'angular2/core';
import {Task} from '../interfaces/Task.Interface';
import {LocalTasksService} from '../services/local-tasks.service';

@Component({
	selector: 'task-item',
	inputs: ['task'],
	template: `
		<div class="task-item">
			<input [(ngModel)]="task.isComplete" (change)="update()" type="checkbox">
			<input [(ngModel)]="task.name" (keyup)="update()"/>
			<button (click)="delete()">Delete</button>
		</div>
	`
})

export class TaskItemComponent{
	public task: Task;

	@Output() dirty = new EventEmitter();

	constructor(private _localTaskService : LocalTasksService){}

	update(){
		this._localTaskService.updateTask(this.task);
		this.dirty.emit('event');
	}

	delete(){
		this._localTaskService.deleteTask(this.task.id);
		this.dirty.emit('event');
	}
}