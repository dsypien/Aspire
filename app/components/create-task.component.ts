import {Component, EventEmitter, Output} from 'angular2/core';
import {LocalTasksService} from '../services/local-tasks.service';
import {TaskInterface} from '../interfaces/Task.interface';

@Component({
	selector: 'create-task',
	templateUrl: '/app/components/create-task.component.html'
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