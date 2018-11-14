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
    try {
      await this.props.login(this.state.username, this.state.password);
    } catch (exception) {
      this.setState({
        password: "",
        error: "käyttäjätunnus tai salasana virheellinen"
      });
      setTimeout(() => {
        this.setState({ error: null });
      }, 5000);
    }
  };

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Log in</h2>
        <h3>{this.state.error}</h3>

        <form onSubmit={this.submit}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
