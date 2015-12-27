import {Injectable} from 'angular2/core';
import {TaskServiceInterface} from '../interfaces/TaskService.Interface';

@Injectable()
export class LocalTasksService implements TaskServiceInterface{
	_isDirty: boolean = false;
	_tasks: { nextID: number, items: Array<any> };

	getTasks(){		
		return Promise.resolve(this.getTasksObject().items);
	}

	private getTasksObject(){
		if (this._isDirty) {
			var tasks = localStorage.getItem('tasks');

			if (tasks === null) {
				this._tasks = { nextID: 1, items: [] };
			}
			else {
				this._tasks = JSON.parse(tasks);
			}

			this._isDirty = false;
		}

		return this._tasks;
	}

	createTask(Task){
		var tasks = this.getTasksObject();

		Task.id = tasks.nextID;
		tasks.nextID++;
		tasks.items.push(Task);

		localStorage.setItem('tasks', JSON.stringify(tasks));

			this._isDirty = true;
	}
	
	updateTask(Task){

		this._isDirty = true;
	}
	
	deleteTask(id: number){

		this._isDirty = true;
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