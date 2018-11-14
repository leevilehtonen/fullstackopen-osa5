import React from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";

import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      user: null,
      notification: null,
      error: true
    };
  }

  componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState({ user });
      blogService.setToken(user.token);
    }
    blogService.getAll().then(blogs => this.setState({ blogs }));
  }
  login = async (username, password) => {
    try {
      const result = await loginService.login({
        username,
        password
      });
      this.setState({ user: result });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(result));
      blogService.setToken(result.token);
      this.notify("logged in succesfully", false);
    } catch (e) {
      this.notify("incorrect username or password", true);
    }
  };

  logout = async () => {
    window.localStorage.removeItem("loggedBlogappUser");
    this.setState({ user: null });
    blogService.setToken("");
    this.notify("logged out succesfully", false);
  };

  create = async (title, author, url) => {
    const blog = await blogService.create({
      title,
      author,
      url
    });
    const blogs = await blogService.getAll();
    this.setState({ blogs });
    this.notify(`a new blog "${blog.title}" by ${blog.author} created`, false);
  };

  notify = (notification, error) => {
    this.setState({
      notification,
      error
    });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 5000);
  };

  render() {
    if (this.state.user === null) {
      return (
        <div>
          {this.state.notification && (
            <Notification
              text={this.state.notification}
              error={this.state.error}
            />
          )}
          <LoginForm login={this.login} />
        </div>
      );
    } else {
      return (
        <div>
          <h2>Blogs</h2>
          {this.state.notification && (
            <Notification
              text={this.state.notification}
              error={this.state.error}
            />
          )}
          <p>
            {this.state.user.name}
            <span> logged in </span>
            <button onClick={() => this.logout()}>logout</button>
          </p>
          <CreateForm create={this.create} />
          <br />
          {this.state.blogs.map(blog => (
            <Blog key={blog._id} blog={blog} />
          ))}
        </div>
      );
    }
  }
}

const Notification = ({ text, error }) => (
  <div
    className={
      "notification " +
      (error ? "negativeNotification" : "positiveNotification")
    }
  >
    <p>{text}</p>
  </div>
);

export default App;
