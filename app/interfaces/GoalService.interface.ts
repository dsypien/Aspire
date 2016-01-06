import {GoalInterface} from './Goal.Interface';

export interface GoalServiceInterface{
	get();
	create(GoalInterface);
	update(GoalInterface);
	delete(id: number);
}