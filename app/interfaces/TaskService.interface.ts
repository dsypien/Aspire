import {Task} from './Task.Interface';

export interface TaskServiceInterface{
	getTasks()
	createTask(Task);
	updateTask(Task);
	deleteTask(id: number);
}