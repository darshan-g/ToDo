/**
 * Todo
 *
 * (c) Machinify 2018. All rights reserved.
 * @flow
 **/

 import TodoAPI from "../TodoAPI.js";

 export default class Todo {
  _id: ?string;
  _title: string;

  // A unique identifier for a Todo.
  // It can be null if the Todo hasn't been saved yet.
  get id(): ?string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(newTitle: string) {
    this._title = newTitle;
  }

  // Only Todos with titles that have non-white space characters are valid
  get isValid(): boolean {
    return this._title.trim().length > 0;
  }

  save() {
    let method = null;
    if (this._id == null) {
      method = TodoAPI.createTodo;
    } else {
      method = TodoAPI.updateTodo
    }
    return method(this).then((newData) => {
      this._id = newData.id;
      this.title = newData.title;
    })
  }
  
  deleteTodo(item): Promise<any> {
    return TodoAPI.deleteTodo(item);
  }


  toJSON(): Object {
    return {
      id: this._id,
      title: this.title,
    }
  }

  static fromJSON(data: Object): Todo {
    const todo = new Todo();
    todo._id = data.id;
    todo.title = data.title;
    return todo;
  }
 }