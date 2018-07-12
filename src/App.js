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
      textarea: "# There's a road for the taking\n## If you end our world's aching\n\nCan you guess where this line was uttered?\n\nIf you need a hint, you may need a [heart](https://en.wikipedia.org/wiki/United_Kingdom).\n\n---\n\nWhy bother with this **trivial pursuit**?\n\nI find it helpful to _learn_ while _having fun_.\n\n---\nPutting that aside, here are few technologies I am currently enjoying: \n- React.js\n- SVG\n- D3.js\n\nHere's a `path` element used on this very page:\n\n```HTML\n<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>\n\t<path d='M 0 0 H 100 Q 40 0 0 50' fill='hsl(208, 84%, 80%)'/><path d='M 100 100 H 0 Q 60 100 100 50' fill='hsl(208, 84%, 80%)'/>\n</svg>\n```\n\nAnd here's a quote, if you really need another one.\n\n>Take Heed: You Do Not Find What You Do Not Seek.\n\n>English Proverb\n\n**_Have a good one_**!\n\n![Smiling Dolphin](https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)"
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
