import React from "react";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  toggleOpen = () => {
    this.setState({ opened: !this.state.opened });
  };

  addLike = async () => {
    const newBlog = Object.assign({}, this.props.blog);
    newBlog.likes++;
    await this.props.update(newBlog);
    this.setState({ opened: true });
  };
  delete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${this.props.blog.title} by ${
          this.props.blog.author
        }`
      )
    ) {
      await this.props.delete(this.props.blog);
    }
  };

  render = () => {
    const { blog, deletable } = this.props;
    const { opened } = this.state;

    if (opened) {
      return (
        <div className={"blog"} onClick={this.toggleOpen}>
          <p>
            <b>
              {blog.title} {blog.author}
            </b>
          </p>
          <div className={"blogContent"}>
            <p>{blog.url}</p>
            <p>
              {blog.likes} likes <button onClick={this.addLike}>like</button>
            </p>
            <p>added by {blog.user.name}</p>
            {deletable && (
              <p>
                <button onClick={this.delete}>delete</button>
              </p>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className={"blog"} onClick={this.toggleOpen}>
          {blog.title} {blog.author}
        </div>
      );
    }
  };
}

export default Blog;
