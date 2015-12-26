import {Component} from 'angular2/core';
import {TaskListComponent} from './task-list'

@Component({
    selector: 'my-app',
    directives: [TaskListComponent],
    template: `
    	<h1>Daily Tasks </h1>
    	<task-list></task-list>
    `
})
export class AppComponent { }