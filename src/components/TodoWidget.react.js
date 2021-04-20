/**
 * TodoWidget
 *
 * (c) Machinify 2018. All rights reserved.
 * @flow
 **/
"use strict";
import * as React from "react";
import Todo from "../models/Todo.js";

export type TodoWidgetProps = {
  todo: Todo,
  updateLoader: Function,
  updateErrorText: Function,
  removeTodo: Function
};

export type TodoWidgetState = {
  title: string,
};

export default class TodoWidget extends React.Component<TodoWidgetProps, TodoWidgetState> {
  static defaultProps: void;

  constructor(props: TodoWidgetProps) {
    super(props);
    autobind(this, "_handleTitleChanged", "_handleTitleBlur", "_isAlphaNumeric");
    this.state = {
      title: this.props.todo.title,
      isError: false
    };
  }

  render(): React.Node {
    return (
      <div>
        <input
          type="text"
          value={this.state.title}
          onChange={this._handleTitleChanged}
          onBlur={this._handleTitleBlur}
          />
          <input
          style={{marginLeft: "10px"}}
          type="button"
          value="Delete Todo"
          onClick={ () => this.props.removeTodo(this.props.todo) }
           />
          {this.state.isError && <div style={{color: "red"}}>Please enter alphanumeric characters</div>}
      </div>
    );
  }

  _handleTitleChanged(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const inputVal = event.target.value;
      this.setState({title: inputVal});
      this._isAlphaNumeric(inputVal);
    }
  }

  _isAlphaNumeric(inputVal) {
    const regExp = /[^a-zA-Z0-9]/;
    if(regExp.test(inputVal)) {
      this.setState({isError: true});
    } else {
      this.setState({isError: false});
    }
  }

  _handleTitleBlur(event: Event) {
    if(!this.state.isError) {
      this.setState({isError: false});
      this.props.updateLoader(true);
      this.props.todo.title = this.state.title;
      this.props.updateErrorText('');
      this.props.todo.save().then(() => {
        this.props.updateLoader(false);
      }).catch(err => {
        this.props.updateLoader(false);
        this.props.updateErrorText(err.message);
    });
    }
  }
}