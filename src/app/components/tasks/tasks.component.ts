import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { AppState } from 'src/app/state/app.state';
import { addTask, deleteTask, loadTasks, toggleReminder } from 'src/app/state/task/task.actions';
import { error, selectAllTasks, loading } from 'src/app/state/task/task.selector';
import { Task } from '../../api/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks$ = this.store.select(selectAllTasks);
  error$ = this.store.select(error);
  loading$ = this.store.select(loading);
  showAddTask$: Observable<boolean> = this.uiService.onToggle();

  constructor(private uiService: UiService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.refreshTasks();
  }

  private refreshTasks() {
    this.store.dispatch(loadTasks());
  }

  deleteTask(task: Task) {
    this.store.dispatch(deleteTask({ id: task.id! }));
  }

  toggleReminder(task: Task) {
    this.store.dispatch(toggleReminder({ task: task }));
  }

  onAddTask(task: Task) {
    this.store.dispatch(addTask({ task }));
    this.uiService.toggleAddTask();
  }

}
