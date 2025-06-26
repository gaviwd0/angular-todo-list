import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);

  constructor() { }

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(title: string, description: string): void {
    const newTodo: Todo = {
      id: this.generateId(),
      title,
      description,
      completed: false
    };
    
    this.todos = [...this.todos, newTodo];
    this.todosSubject.next(this.todos);
  }

  toggleTodo(id: number): void {
    this.todos = this.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    
    this.todosSubject.next(this.todos);
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todosSubject.next(this.todos);
  }

  private generateId(): number {
    return this.todos.length > 0 
      ? Math.max(...this.todos.map(todo => todo.id)) + 1 
      : 1;
  }
}
