import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TaskState } from './task.reducer';

export const selectTasks = (state: AppState) => state.tasks;
export const selectAllTasks = createSelector(
  selectTasks,
  (state: TaskState) => state.tasks
);

export const error = createSelector(
  selectTasks,
  (state: TaskState) => state.error
)

export const loading = createSelector(
  selectTasks,
  (state: TaskState) => state.status === 'loading'
);
