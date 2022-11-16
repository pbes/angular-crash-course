import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Task } from '../api/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const options = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  }),
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.apiUrl);
  }

  deleteTask(taskId: number): Observable<Task> {
    return this.httpClient.delete<Task>(`${this.apiUrl}/${taskId}`);
  }

  toggleReminder(task: Task): Observable<Task> {
    const updatedTask = { ...task, reminder: !task.reminder };
    return this.httpClient.put<Task>(`${this.apiUrl}/${task.id}`, updatedTask, options);
  }

  addNewTask(task: Task): Observable<Task> {
    console.log('adding task');
    return this.httpClient.post<Task>(`${this.apiUrl}`, task, options);
  }
}
