import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addTask,
  deleteTask,
  toggleReminder,
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
} from './task.actions';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  // Run this code when a loadTasks action is dispatched
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(() =>
        // Call the getTasks method, get observable
        this.taskService.getTasks().pipe(
          // Take the returned value and return a new success action containing the tasks
          map((tasks) => loadTasksSuccess({ tasks: tasks })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    () =>
      this.actions$.pipe(
        ofType(addTask),
        switchMap((action) => this.taskService.addNewTask(action.task)),
      ),
      { dispatch: false }
  );

  deleteTask$ = createEffect(() =>
    () =>
      this.actions$.pipe(
        ofType(deleteTask),
        switchMap((action) => this.taskService.deleteTask(action.id)),
      ),
      { dispatch: false }
  );

  toggleReminder$ = createEffect(() =>
    () =>
      this.actions$.pipe(
        ofType(toggleReminder),
        switchMap((action) => this.taskService.toggleReminder(action.task)),
      ),
      { dispatch: false }
  );
}
