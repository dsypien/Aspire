import {Injectable} from 'angular2/core';
import {TaskServiceInterface} from '../interfaces/TaskService.Interface';
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

	private getTaskIndex(ary : Array<any>, value: number){
		var aryLength = ary.length;
		for (var i = 0; i < aryLength; i++) {
			if (ary[i].id === value) {
				return i;
			}
		}

		return null;
	}

	private getTaskByID(ary: Array<any>, value: number) {
		var index = this.getTaskIndex(ary, value);

		if(index !== null){
			return ary[index];
		}
		else{
			return null;
		}
	}

	createTask(pTask){
		var tasks = this.getTasksObject();

		pTask.id = tasks.nextID;
		tasks.nextID++;
		tasks.items.push(pTask);

		localStorage.setItem('tasks', JSON.stringify(tasks));

		this._isDirty = true;
	}
	
	updateTask(pTask){
		var tasks = this.getTasksObject();
		var task = this.getTaskByID(tasks.items, pTask.id);

		// Do a deep copy
		// To Do : Should have a better way to do a deep copy on objects
		task.name = pTask.name;
		task.isComplete = pTask.isComplete;

		localStorage.setItem('tasks', JSON.stringify(tasks));

		this._isDirty = true;
	}
	
	deleteTask(id: number){
		var tasks = this.getTasksObject();
		var index = this.getTaskIndex(tasks.items, id);

		if(index !== null){
			tasks.items.splice(index, 1);
		}

		localStorage.setItem('tasks', JSON.stringify(tasks));

		this._isDirty = true;
	}
}
