import React from 'react';
import marked from 'marked';
import './OutputArea.css';

// with a stateless functional component, render a div which nests as HTML content the string result of the marked.js library
const OutputArea = (props) => {
  // manage the text in the text area with markdown syntax
  let markdown = marked(props.textarea, {headerIds : false, smartypants: true});
  return (
    // include the markdown result in the HTML of the div
    <div className="OutputArea" dangerouslySetInnerHTML={{ __html: markdown }}>
    </div>
  );
}

export default OutputArea;
