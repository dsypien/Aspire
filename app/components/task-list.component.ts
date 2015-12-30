import {Component} from 'angular2/core';
import {TaskItemComponent} from './task-item.component';
import {CreateTaskComponent} from './create-task.component';
import {OnInit} from 'angular2/core';
import {LocalTasksService} from '../services/local-tasks.service';
import {TaskServiceInterface} from '../interfaces/TaskService.Interface';

@Component({
	selector: 'task-list',
	template: `
		<ul>
			<task-item *ngFor="#task of tasks" [task]="task"></task-item>
			<create-task></create-task>
		</ul>
	`,
	directives: [TaskItemComponent, CreateTaskComponent],
	providers: [LocalTasksService]
})

export class TaskListComponent{
	public tasks: {};

	constructor(private _taskService: LocalTasksService) {
	}

	ngOnInit(){
		this.getTasks();
	}

	getTasks(){
		this._taskService.getTasks().then(
			tasks=> {
				console.log(tasks);
				this.tasks = tasks
			}
		);
	}
	
}