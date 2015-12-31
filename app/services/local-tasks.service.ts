import {Injectable} from 'angular2/core';
import {TaskServiceInterface} from '../interfaces/TaskService.Interface';
import {TaskMap} from '../interfaces/TaskMap.Interface';
import {Task} from '../interfaces/Task.Interface';

@Injectable()
export class LocalTasksService implements TaskServiceInterface{
	private _isDirty: boolean = true;
	private _tasks: { nextID: number, items: Array<any> };

	getTasks(){		
		var tasks = this.getTasksObject();

		if (tasks && tasks.items.length > 0) {
			return Promise.resolve(tasks.items);
		}
		else{
			return Promise.resolve(null);
		}
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

	private getTaskByID(ary : Array<any>, value: string){
		var aryLength = ary.length;
		for (var i = 0; i < aryLength; i++) {
			if (ary[i].id === value) {
				return ary[i];
			}
		}

		return null;
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
		var tasks = this.getTasksObject();
		var task = this.getTaskByID(tasks.items, Task.id);

		task = Task;

		localStorage.setItem('tasks', JSON.stringify(tasks));

		this._isDirty = true;
	}
	
	deleteTask(id: number){

		this._isDirty = true;
	}
}
