import {GoalInterface} from './Goal.Interface';
import {DailyStatus} from '../common/DailyStatus';

export interface GoalServiceInterface{
	// Goals
	get();
	create(GoalInterface) :void;
	update(GoalInterface) :void;
	archive(id: number) :void;

	// Daily Goals
	 updateDailyStatus(DailyStatus);
	 getTodaysGoals();
}