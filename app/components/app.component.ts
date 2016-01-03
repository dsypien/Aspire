import {Component} from 'angular2/core';
import {TaskListComponent} from './task-list.component';

@Component({
    selector: 'my-app',
    directives: [TaskListComponent],
    templateUrl: '/app/components/app.component.html'
})

export class AppComponent { }