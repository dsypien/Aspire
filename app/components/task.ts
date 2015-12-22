import {Component} from 'angular2/core'

@Component({
	selector: 'task',
	template: `
		<input type="checkbox"> {{name}}
	`
})

export class TaskComponent{
	name: string;

	constructor(){
		this.name = "";
	}
}