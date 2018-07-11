import React, { Component } from 'react';
import './App.css';
import InputArea from './InputArea';
import OutputArea from './OutputArea';

// the parent component manages the state for the application (a single field for the textarea content)
// moreover, it renders the two components for the input and output sections
class App extends Component {
  // set through the state a field used to include the string of text found in the text area element
  constructor(props) {
    super(props);
    this.state = {
      textarea: "# There's a road for the taking\n## if you end our world's aching"
    };
    // bind the method to _this_ 
    this.handleChange = this.handleChange.bind(this);
  }

  // create a method which updates the state's only field with the value of the elements which has triggered the change 
  handleChange(event) {
    this.setState({
      textarea: event.target.value
    });
  }
  render() {
    return (
      <div className="App">
        {/* 
        render the input and output areas
        for the input area, pass as props the textarea field, but also the handleChange method to update the state
        for the output area, pass only the textarea field (which is managed locally with the marked.js library)
        */}
        <InputArea textarea = {this.state.textarea} handleChange = { this.handleChange } />
        <OutputArea textarea = {this.state.textarea} />
      </div>
    );
  }
}

export default App;
