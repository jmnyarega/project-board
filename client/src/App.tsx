import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from "@apollo/client"

const FEED_QUERY = gql`
{
  board {
    title
    columns {
      position
      name
      cards {
        name
        position
        content
      }
    }
  }
}
`;

function App() {
  const { data } = useQuery(FEED_QUERY);

  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
