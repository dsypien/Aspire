import {TaskInterface} from './Task.Interface';

export interface TaskServiceInterface{
	getTasks();
	createTask(TaskInterface);
	updateTask(TaskInterface);
	deleteTask(id: number);
}