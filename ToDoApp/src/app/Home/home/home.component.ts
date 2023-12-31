import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations'; // Import animations

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { ToDoentity } from './homentity';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent  implements OnInit{

  ToDo: ToDoentity = new ToDoentity();
  successMessage: string = '';
  errormessage:string='';

  constructor(private service: ApiService) {}

  
  createTodoItem() {
    this.service.createTodo(this.ToDo).subscribe(
      () => {
        this.successMessage = 'Data added successfully.';
        this.errormessage='';
        this.ToDo = new ToDoentity(); // clear the form
      },
      (error) => {
        console.error('Error:', error)
        this.errormessage="Please provide the deatils";
        this.successMessage='';
      }
      
    );
  }

  // Method to close the success message
  closeSuccessMessage() {
    this.successMessage = '';
  }

  //get the deatils
  
  todoList: any[] = []; // Adjust the type as needed
  errorMessage: string = '';
  ngOnInit(): void {
    this.ToDo=new ToDoentity();
    this.getTodoDetails();
  }

  getTodoDetails() {
    this.service.getDetails().subscribe(
      (todoList: any) => {
        // Handle the successful response here
        this.todoList = todoList;
      },
      (error) => {
        // Handle any errors here
        this.errorMessage = 'Error fetching todo details.'; // Customize the error message
        console.error('Error fetching todo details:', error);
      }
    );
  }

  toggleCompletion(todo: any): void {
    todo.complete = !todo.complete;
    this.service.updateTodoCompletion(todo.id, todo.complete).subscribe();
  }
  
  delete(todo:ToDoentity){
    this.service.delete(todo).subscribe(res=>{
      console.log(res);
    })
  
  }
  // delete(todo: ToDoentity) {
  //   this.service.delete(todo).subscribe(
  //     (response) => {
  //       if (response === null || response === undefined) {
  //         // The response body is empty, which is expected for a DELETE request
  //         // Remove the deleted todo from the todoList
  //         this.todoList = this.todoList.filter((t) => t.id !== todo.id);
  //       } else {
  //         // Handle unexpected response content if needed
  //         console.error('Unexpected response content:', response);
  //       }
  //     },
  //     (error) => {
  //       // Handle errors (you can set an error message here)
  //       console.error('Error deleting ToDoentity:', error);
  //     }
  //   );
  // }
  
}

