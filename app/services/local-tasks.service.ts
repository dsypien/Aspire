import {Injectable} from 'angular2/core';
import {TaskServiceInterface} from '../interfaces/TaskService.Interface';

@Injectable()
export class LocalTaskService implements TaskServiceInterface{
	getTasks(){

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