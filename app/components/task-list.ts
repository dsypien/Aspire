import {Component} from 'angular2/core';
import {TaskItemComponent} from './task-item';
import {OnInit} from 'angular2/core';
import {LocalTasksService} from '../services/local-tasks.service';
import {TaskServiceInterface} from '../interfaces/TaskService.Interface';

@Component({
	selector: 'task-list',
	template: `
		<ul>
			<task-item *ngFor="#task of tasks" [task]="task"></task-item>
		</ul>
	`,
	directives: [TaskItemComponent],
	providers: [LocalTasksService]
})

export class TaskListComponent{
	public tasks: Array<any>;

	constructor(private _taskService: LocalTasksService) {
	}

	ngOnInit(){
		this.getTasks();
	}

	getTasks(){
		this._taskService.getTasks().then(tasks=> this.tasks = tasks);
	}
	
}