import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { Task } from 'src/app/api/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter<Task>();

  model: Task = {
    text: '',
    day: '',
    reminder: false
  }

  constructor() { }

  ngOnInit(): void {
    this.model = {
      text: '',
      day: '',
      reminder: false
    }
  }

  onSubmit() {
    this.onAddTask.emit(this.model);
  }

}
