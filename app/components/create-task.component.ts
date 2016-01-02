import {Component, EventEmitter, Output} from 'angular2/core';
import {LocalTasksService} from '../services/local-tasks.service';
import {Task} from '../interfaces/Task.interface';

@Component({
	selector: 'create-task',
	template: `
		<div class='create-task'>
			<input type='text' placeholder="Whats your goal?" #taskName >
			<button (click)="createTask(taskName.value)"
					[disabled]="taskName.Value === ''"> Create Task
			</button>
		</div>	
	`
})

export class CreateTaskComponent{
	@Output() taskCreated = new EventEmitter();

	constructor(private _localTaskService : LocalTasksService){

	}

	createTask(taskName){
		var task = {
			isComplete: false,
			name: taskName
		}

		this._localTaskService.createTask(task);
		this.taskCreated.emit('event');

		taskName.value = null;

	}
}