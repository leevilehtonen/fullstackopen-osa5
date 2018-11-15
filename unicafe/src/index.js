import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import counterReducer from "./reducer";

const Statistiikka = () => {
  const palautteita = Object.values(store.getState()).reduce(
    (acc, val) => acc + val
  );

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    );
  }

  const signs = [1, 0, -1];

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>
              {Object.values(store.getState()).reduce(
                (acc, val, index) => acc + val * signs[index]
              ) / palautteita}
            </td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>
              {((store.getState().ok + store.getState().good) / palautteita) *
                100}{" "}
              %
            </td>
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div>
  );
};

class App extends React.Component {
  klik = nappi => () => {
    store.dispatch({ type: nappi });
  };

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik("GOOD")}>hyvä</button>
        <button onClick={this.klik("OK")}>neutraali</button>
        <button onClick={this.klik("BAD")}>huono</button>
        <Statistiikka />
      </div>
    );
  }
}

const store = createStore(counterReducer);

const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

render();
store.subscribe(render);
