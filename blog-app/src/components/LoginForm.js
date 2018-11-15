import React from "react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null
    };
  }

  submit = async event => {
    event.preventDefault();
    await this.props.login(this.state.username, this.state.password);
  };

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={this.submit}>
          <div>
            <span>Username: </span>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            <span>Password: </span>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
