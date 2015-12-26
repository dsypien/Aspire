import {Component} from 'angular2/core'
import {TaskItemComponent} from './task-item'

@Component({
	selector: 'task-list',
	template: `
		<ul>
			<task-item *ngFor="#task of tasks" [task]="task"></task-item>
		</ul>
	`,
	directives: [TaskItemComponent]
})

export class TaskListComponent{
	public tasks: Array<any>;

	constructor(){
		this.tasks = TASKS;
	}
}

var TASKS = [
	{
		name: "Do a pomodoro of technical training",
		isComplete: false
	},
	{
		name: "Do a pomodoro of work on personal project",
		isComplete: false
	}
];