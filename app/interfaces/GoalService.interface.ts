import {GoalInterface} from './Goal.Interface';

export interface GoalServiceInterface{
	// Goals
	get();
	create(GoalInterface) :void;
	update(GoalInterface) :void;
	archive(id: number) :void;

	// Daily Goals
	 updateDailyStatus(GoalInterface:GoalInterface, date:Date);
	 getTodaysGoals();
}