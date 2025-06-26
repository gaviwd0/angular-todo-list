import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.interface';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  newTodoTitle: string = '';
  newTodoDescription: string = '';
  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos();
  }

  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle, this.newTodoDescription);
      this.newTodoTitle = '';
      this.newTodoDescription = '';
    }
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  getStatusText(completed: boolean): string {
    return completed ? 'Completada' : 'Pendiente';
  }
}
