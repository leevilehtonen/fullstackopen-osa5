import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anecdote: ""
    };
  }
  addVote = id => {
    this.props.store.dispatch({ type: "ADD_VOTE", id });
  };
  submitForm = e => {
    e.preventDefault();
    this.props.store.dispatch({
      type: "ADD_ANECDOTE",
      anecdote: this.state.anecdote
    });
    this.setState({ anecdote: "" });
  };
  handleAnecdoteChange = e => {
    this.setState({ anecdote: e.target.value });
  };

  render() {
    const anecdotes = this.props.store.getState();
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
        <h2>create new</h2>
        <form>
          <div>
            <input
              value={this.state.anecdote}
              onChange={this.handleAnecdoteChange}
            />
          </div>
          <button onClick={this.submitForm}>create</button>
        </form>
      </div>
    );
  }
}

export default App;
