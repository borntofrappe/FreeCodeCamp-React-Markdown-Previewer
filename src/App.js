import React, { Component } from 'react';
import './App.css';
import InputArea from './InputArea';
import OutputArea from './OutputArea';


class App extends Component {
  render() {
    return (
      <div className="App">
        <InputArea />
        <OutputArea />
      </div>
    );
  }
}

export default App;
