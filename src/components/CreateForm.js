import React from "react";

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      url: ""
    };
  }

  submit = async event => {
    event.preventDefault();
    await this.props.create(
      this.state.title,
      this.state.author,
      this.state.url
    );
    this.setState({
      title: "",
      author: "",
      url: ""
    });
  };

  handlFormFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <h3>Create new</h3>

        <form onSubmit={this.submit}>
          <div>
            <span>Title: </span>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handlFormFieldChange}
            />
          </div>
          <div>
            <span>Author: </span>
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handlFormFieldChange}
            />
          </div>
          <div>
            <span>Url: </span>
            <input
              type="url"
              name="url"
              value={this.state.url}
              onChange={this.handlFormFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
  }
}

export default CreateForm;
