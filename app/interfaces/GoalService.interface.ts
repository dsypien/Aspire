import {GoalInterface} from './Goal.Interface';

export interface GoalServiceInterface{
	// Goals
	get();
	create(GoalInterface);
	update(GoalInterface);
	archive(id: number);

	// Daily Goals
	 updateTodaysGoal(GoalInterface);
	 getTodaysGoals();
}