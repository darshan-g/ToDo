/**
 * App
 *
 * (c) Machinify 2018. All rights reserved.
 * @flow
 **/
"use strict";
import * as React from "react";
// $FlowIssue need react-hot-loader declarations
import {hot} from "react-hot-loader";
import TodoList from "../models/TodoList.js";
import TodoListWidget from "./TodoListWidget.react.js";

window.autobind = function(/*this, ...methods*/) {
  var obj = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    var method = arguments[i];
    if (obj[method] == null) {
      console.error(`Called autobind for missing method: ${method}`)
    }
    obj[method] = obj[method].bind(obj);
  }
};

class App extends React.Component<void, void> {
  _todoList: TodoList;
  constructor() {
    super();
    this._todoList = new TodoList();
  }

  render(): React.Node {
    return (
      <div>
        <TodoListWidget
          todoList={this._todoList}
          />
      </div>
    );
  }
}

export default hot(module)(App);