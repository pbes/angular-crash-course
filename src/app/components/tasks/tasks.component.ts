import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';
import { Task } from '../../api/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]> | undefined;
  showAddTask$: Observable<boolean>;

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.showAddTask$ = this.uiService.onToggle();
  }

  ngOnInit(): void {
    this.showAddTask$ = this.uiService.onToggle();
    this.refreshTasks();
  }

  private refreshTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.refreshTasks();
    });
  }

  toggleReminder(task: Task) {
    this.taskService.toggleReminder(task).subscribe(() => {
      console.log('toggle reminder');
    });
  }

  onAddTask(task: Task) {
    this.taskService.addNewTask(task).subscribe(() => {
      this.refreshTasks();
    });
    this.uiService.toggleAddTask();
  }

}
