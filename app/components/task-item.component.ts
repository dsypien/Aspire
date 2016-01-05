import {Component, EventEmitter, Output} from 'angular2/core';
import {CheckboxControlValueAccessor} from 'angular2/common';
import {TaskInterface} from '../interfaces/Task.Interface';
import {LocalTasksService} from '../services/local-tasks.service';

@Component({
	selector: 'task-item',
	inputs: ['task'],
	templateUrl: '/app/components/task-item.component.html'
})

export class TaskItemComponent{
	public task: TaskInterface;

	@Output() dirty = new EventEmitter();

	constructor(private _localTaskService : LocalTasksService){}

	update(){
		this._localTaskService.updateTask(this.task);
	}

	delete(){
		this._localTaskService.deleteTask(this.task.id);
		this.dirty.emit('event');
	}

	updateComplete(event) {
		this.task.isComplete = event.srcElement.checked;
		this._localTaskService.updateTask(this.task);
	}
}