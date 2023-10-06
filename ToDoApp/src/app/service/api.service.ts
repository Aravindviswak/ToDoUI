import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoentity } from '../Home/home/homentity';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api="http://localhost:8083/api/todos";
  
  private apiUrl="http://localhost:8083/api/todos/todoComplete"

  constructor(private http:HttpClient) { }
  getDetails():Observable<any>{
    return this.http.get(this.api);
  }
  updateTodoCompletion(id: number, complete: boolean): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, { complete });
  }

  createTodo(todo:ToDoentity):Observable<any>{
    return this.http.post(this.api, todo, { responseType: 'text' });
  
  }

 
}
