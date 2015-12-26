import {Task} from './Task.Interface';

export interface TaskServiceInterface{
	getTasks()
	getTasksByID(id: number);
	createTask(Task);
	updateTask(Task);
	deleteTask(id: number);
}