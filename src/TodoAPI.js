/**
 * TodoAPI
 *
 * (c) Machinify 2018. All rights reserved.
 * @flow
 **/

import Todo from "./models/Todo.js";

/**** Set the userID constant to your email address ****/
const userID = "darshan.gurubaxani803@gmail.com";

const baseUrl = "https://machinify.blogaholics.ca:8443";

export default class TodoAPI {
  static doGet(url: string): Promise<any> {
    return fetch(url, {headers: {"X-TodoUser": userID}}).then((response) => {
      return response.json();
    });
  }

  static doPost(url: string, data: any): Promise<any> {
    return fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=utf-8", "X-TodoUser": userID},
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
  }

  static doDelete(url: string): Promise<any> {
    return fetch(url, {
      method: "DELETE",
      headers: {"X-TodoUser": userID},
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    });
  }

  static getList(): Promise<Array<Todo>> {
    return TodoAPI.doGet(`${baseUrl}/todos`);
  }

  static updateTodo(todo: Todo): Promise<Todo> {
    const id = todo.id;
    if (id == null) return Promise.reject(new Error("Todo has no id"));
    return TodoAPI.doPost(`${baseUrl}/todos/${id}`, todo.toJSON());
  }

  static createTodo(todo: Todo): Promise<Todo> {
    return TodoAPI.doPost(`${baseUrl}/todos/new`, todo.toJSON());
  }

  static deleteTodo(todo: Todo): Promise<Todo> {
    const id = todo.id;
    if (id == null) return Promise.reject(new Error("Todo has no id"));
    return TodoAPI.doDelete(`${baseUrl}/todos/${id}`);
  }
}
