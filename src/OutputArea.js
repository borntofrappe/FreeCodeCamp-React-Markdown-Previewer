import React from 'react';
import marked from 'marked';
import './OutputArea.css';

// with a stateless functional component, render a div which nests as HTML content the string result of the marked.js library
const OutputArea = (props) => {
  // marked() accepts two arguments: the string to be managed with markdown syntax and an object for the opions
  // look at the documentation for slightly more information on the options
  // breaks alloww to include hard ans soft line breaks.
  // xhtml allows to properly include self-closing elements like <br/>
  let markdown = marked(props.textarea, { breaks: true, xhtml : true });
  return (
    // include the markdown result in the HTML of the div
    <div className="OutputArea" id="preview" dangerouslySetInnerHTML={{ __html: markdown }}>
    </div>
  );
}

export default OutputArea;
