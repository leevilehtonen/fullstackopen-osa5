import React from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import LoginForm from "./components/LoginForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      user: null
    };
  }

  componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState({ user });
    }
    blogService.getAll().then(blogs => this.setState({ blogs }));
  }
  login = async (username, password) => {
    const result = await loginService.login({
      username,
      password
    });
    this.setState({ user: result });
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(result));
  };

  render() {
    if (this.state.user === null) {
      return <LoginForm login={this.login} />;
    } else {
      return (
        <div>
          <h2>blogs</h2>
          <p>{this.state.user.name} logged in</p>
          {this.state.blogs.map(blog => (
            <Blog key={blog._id} blog={blog} />
          ))}
        </div>
      );
    }
  }
}

export default App;
