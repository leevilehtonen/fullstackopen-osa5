import React from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";

import "./app.css";
import Togglable from "./components/Toggleable";

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

  componentDidMount = async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      this.setState({ user });
      blogService.setToken(user.token);
    }
    let blogs = await blogService.getAll();
    blogs = this.sortBlogs(blogs);
    this.setState({ blogs });
  };
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
    let blogs = await blogService.getAll();
    blogs = this.sortBlogs(blogs);
    this.setState({ blogs });
    this.notify(`a new blog "${blog.title}" by ${blog.author} created`, false);
  };

  update = async blog => {
    await blogService.update(blog);
    let blogs = await blogService.getAll();
    blogs = this.sortBlogs(blogs);
    this.setState({ blogs });
  };
  delete = async blog => {
    await blogService.remove(blog);
    let blogs = await blogService.getAll();
    blogs = this.sortBlogs(blogs);
    this.setState({ blogs });
    this.notify("deleted", false);
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

  sortBlogs = blogs => {
    return blogs.sort((a, b) => {
      return b.likes - a.likes;
    });
  };

  checkDeletable = blog => {
    if (blog.user === undefined || blog.user === null) {
      return true;
    } else {
      return this.state.user.username === blog.user.username;
    }
  };

  render() {
    if (this.state.user == null) {
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
          <Togglable buttonLabel={"new"}>
            <CreateForm create={this.create} />
          </Togglable>
          <br />
          {this.state.blogs.map(blog => (
            <Blog
              key={blog._id}
              blog={blog}
              update={this.update}
              delete={this.delete}
              deletable={this.checkDeletable(blog)}
            />
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
