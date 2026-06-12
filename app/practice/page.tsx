"use client"

import React, { Component } from "react";
import List from "../../components/list";

interface User {
  id: number;
  name: string;
  age: number;
  password: string;
}

interface State {
  users: User[];

}

class Index extends Component<{}, State> {
  state: State = {
    users: [
      { id: 1, name: "Ali", age: 25, password: "1234" },
      { id: 2, name: "Sara", age: 22, password: "5678" },
      { id: 3, name: "Ahmed", age: 30, password: "9012" }
    ]
  };

  render() {
    return (
      <List
        items={this.state.users}
        renderItem={(user: User) => (
          <div>
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            <p>Password: {user.password}</p>
          </div>
        )}
      />
    );
  }
}

export default Index;