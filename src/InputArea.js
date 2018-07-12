import React from 'react';
import './InputArea.css';

// with a stateless functional component render the textarea, including the field and method passed through the parent component with props
const InputArea = (props) => {
  return(
    <div className="InputArea">
      <textarea name="input" id="editor" value= { props.textarea } onChange= {props.handleChange}></textarea>
    </div>
  );
}

export default InputArea;
