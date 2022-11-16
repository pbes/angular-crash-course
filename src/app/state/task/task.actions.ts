import { createAction, props } from '@ngrx/store';
import { Task } from '../../api/Task';

export const addTask = createAction(
  '[Task Tracker] Add Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task Tracker] Remove Task',
  props<{ id: number }>()
);

export const toggleReminder = createAction(
  '[Task Tracker] Toggle Reminder',
  props<{ task: Task }>()
)

export const loadTasks = createAction('[Task Tracker] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Task API] Task Load Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Task API] Task Load Failure',
  props<{ error: string }>()
);
