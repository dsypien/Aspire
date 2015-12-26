import {Injectable} from 'angular2/core';
import {TaskServiceInterface} from '../interfaces/TaskService.Interface';

@Injectable()
export class LocalTasksService implements TaskServiceInterface{
	getTasks(){
		return Promise.resolve(TASKS);
	}

	getTasksByID(id: number) {

	}

	createTask(Task){

	}
	
	updateTask(Task){

	}
	
	deleteTask(id: number){

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