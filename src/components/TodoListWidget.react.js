/**
 * TodoListWidget
 *
 * (c) Machinify 2018. All rights reserved.
 * @flow
 **/
"use strict";
import * as React from "react";
import TodoList from "../models/TodoList.js";
import Todo from "../models/Todo.js";
import TodoWidget from "./TodoWidget.react.js";

export type TodoListWidgetProps = {
  todoList: TodoList,
};

export default class TodoListWidget extends React.Component<TodoListWidgetProps, void> {
  static defaultProps: void;

  constructor(props: TodoListWidgetProps) {
    super(props);
    autobind(this, "_handleAddTodo", "_updateLoader", "_updateErrorText", "_removeTodo");
    this.state = {
      isLoading: false,
      errorText: '',
    };
  }

  componentDidMount() {
    this.props.todoList.load()
      .then(() => this.forceUpdate());
  }
  render(): React.Node {
    return (
      <React.Fragment>
        <ol>
          {this.props.todoList.list.map((todo, i) =>
            <li key={todo.id}>
              <TodoWidget 
              todo={todo} 
              updateErrorText={this._updateErrorText} 
              updateLoader={this._updateLoader}
              removeTodo={this._removeTodo}
              />
            </li>
          )}
        </ol>
        <input
          type="button"
          value="Add Todo"
          onClick={this._handleAddTodo} />
          {this.state.isLoading && (<span>Loading...</span>)}
          {this.state.errorText.length > 0 && (<div style={{color: "red"}}>{this.state.errorText}</div>)}
      </React.Fragment>
    );
  }

  _updateLoader(isLoading) {
    this.setState({isLoading});
  }

  _updateErrorText(err) {
    this.setState({errorText: err});
  }

  _removeTodo(item) {
    const todo = new Todo();
    this.setState({isLoading: true});
    this.setState({errorText: ''});
    todo.deleteTodo(item).then(() => {
      this.props.todoList.load()
      .then(() => {
        this.setState({isLoading: false});
        this.forceUpdate();
      });
    }).catch(err => {
      this.setState({isLoading: false});
      this.setState({errorText: err.message});
  });
  }

  _handleAddTodo() {
    const todo = new Todo();
    todo.title = "NewTODO";
    this.setState({isLoading: true});
    this.setState({errorText: ''});
    todo.save()
    .then(() => {
      this.setState({isLoading: false});
      this.props.todoList.addTodo(todo);
      this.forceUpdate();
    }).catch(err => {
      this.setState({isLoading: false});
      this.setState({errorText: err.message});
  });
  }
}