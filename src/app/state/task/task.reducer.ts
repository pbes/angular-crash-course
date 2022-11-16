import { createReducer, on } from '@ngrx/store';
import {
  addTask,
  deleteTask,
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
  toggleReminder,
} from './task.actions';
import { Task } from '../../api/Task';

export interface TaskState {
  tasks: Task[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
  status: 'pending',
};

export const taskReducer = createReducer(
  initialState,
  // Add the new Task to the Tasks array
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, { id: Date.now(), text: task.text, day: task.day, reminder: task.reminder }],
  })),
  // Remove the Task from the Tasks array
  on(deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
  on(toggleReminder, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => t.id === task.id ? { ...t, reminder: !task.reminder } : t),
  })),
  // Trigger loading the Tasks
  on(loadTasks, (state) => ({ ...state, status: 'loading' })),
  // Handle successfully loaded Tasks
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    error: null,
    status: 'success',
  })),
  // Handle Tasks load failure
  on(loadTasksFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
