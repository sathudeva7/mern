import React, { Component } from 'react';

import './App.css';
import Heros from './Components/Heros';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Heros</h1>
        <div className="header-bar" />
        <Heros />
      </div>
    );
  }
}

export default App;
