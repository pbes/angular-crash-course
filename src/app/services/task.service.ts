import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  deleteTask(task: Task): Observable<Task> {
    return this.httpClient.delete<Task>(`${this.apiUrl}/${task.id}`);
  }

  toggleReminder(task: Task): Observable<Task> {
    task.reminder = !task.reminder;
    return this.httpClient.put<Task>(`${this.apiUrl}/${task.id}`, task, options);
  }

  addNewTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}`, task, options);
  }
}
