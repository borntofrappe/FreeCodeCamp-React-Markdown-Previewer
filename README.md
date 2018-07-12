In this README, I include notes on the thought and development processes behind the project. 

As I made use of `create-react-app` to set up a development environment, I will include the present repository the public and src folders. Alone they will not be able to finalize the project, but as I build the applications, these are the folders in which most of the work is done.

To have immediate feedback online I also leverage codepen. You can find the work-in-progress pen right [here](https://codepen.io/borntofrappe/pen/OwPdmZ).

# Preface

In the line of 'Front End Libraries Projects' for the _freeCodeCamp_ curriculum, the second project concerns the creation of a simple application which previews markdown syntax. Much alike the referenced [example](https://codepen.io/_freeCodeCamp_/full/GrZVVO).

It is an excellent project, in that it allows to practice existing knowledge in HTML, CSS and JS. At the same time it allows to include new technologies in [React](https://reactjs.org/) and the JavaScript library [Marked.js](https://github.com/markedjs/marked). All while building something functional, which can actually be used for note-taking efforts. 

Almost every day, as I find myself tinkering with new projects, I start with a README file explaining the purpose of the effort which follows. Said README file is exactly written in markdown syntax, so I see the value of this application first hand.

# Design

For the look of the single page application, I decided to be inspired by [Google translate](https://translate.google.com/) and also this particular [design concept](https://dribbble.com/shots/4040108-Google-translate-design-concept-2018). Translate is a perfect example of a single page application with two main areas: an input area and an output area. As you type in one, immediately the input is managed and displayed in the other. 

In terms of actual design, the translate application shows two areas with the same importance, while the markdown previewer app may actually divide the screen with a different ratio. However, that is something which can be altered once the application is up and running.

Just for starters however, a few colors and font choices are included.

Colors:

- black: #252525
- white: #fff
- theme: #0083F5

Font:

- open sans, with the weights of 400 and 700

# Development

The design of the page is undoubtedly important, but the focus of the project is the creation of a functional application. The tests set up by the _freeCodeCamp_ suite are also centered around the application's development and not its design.

In light of this priority check, and with the few design choices already noted above, the ultimate look of the page is delegated to a future update. Learning how to incorporate React and Marked.js takes the priority. 


## React

**First thoughts**

Using `create-react-app` it is possible to set up a component-based environment with the most recent dependencies. Before actually using the command though, a few thoughts on the structure of the application are warranted.

The app is built with components in mind. There exist two large areas, which undoubtedly demand their own component.

- in one component, a `textarea` element allows for user input;

- in another component, the text included in the `textarea` is displayed.

At first it would behoove for the project to start with the simplest possible use-case, namely displaying the same exact text present in the `textarea`. Following this first step, the logical progression is the inclusion of the JS library to manage the text according to the markdown rules. I could see how regex could be used in stead of the library, but using another tool is always good practice to take advantage of external libraries. And learn something new.

**State**

The application needs to manage state in the quality of text. Text which is included in `textarea`, managed and displayed in the output, preview area. As learned in the _freeCodeCamp_ curriculum, the `textarea` can be created as a _controlled component_: a component which is tracked for changes in content/ state, such as when text is added to the element. The component needs to update the state, which then triggers the correct rendering in the preview area.

The state is initialized and managed in the parent component, found in the _App.js_ file. In the constructor function:

- a field for the text of the `textarea` element is created in the state of the component
- a method which updates the field is bound to the context in which it is used.

```JS
constructor(props) {
  super(props);
  this.state = {
    textarea: "# There's a road for the taking\n## if you end our world's aching"
  };
  this.handleChange = this.handleChange.bind(this);
}
```

The method itself is then immeditely defined to update the single field of the state with the value of the event which triggers it:

```JS
handleChange(event) {
  this.setState({
    textarea: event.target.value
  });
}
```

The state is initialized and managed by a single component, but it is necessary for the field and the method to be used elsewhere in the application, by other components. It is here possible to pass as properties both elements, to child components. These will access the field and the method through `props` and have the nested component interact with the state, without actually modifying it directly.

In the parent component, pass the desired elements as attributes of the nested components.

```JS
render() {
  return (
    <div className="App">
      <InputArea textarea = {this.state.textarea} handleChange = { this.handleChange } />
      <OutputArea textarea = {this.state.textarea} />
    </div>
  );
}
```

In the neste components, include `props` as the argument of the functional stateless component or in the constructor function of the stateful component, to benefit from the inherited values.

```JS
const InputArea = (props) => {
  return(
    <div className="InputArea">
      <textarea name="input" id="input" value= { props.textarea } onChange= {props.handleChange}></textarea>
    </div>
  );
}
```

**Dependencies**

The project makes use of the external library [Marked.js](https://marked.js.org/#/README.md#README.md). In codepen, it is a simple matter of adding the library in the _JavaScript_ settings, but locally and with the structure set up by `create-react-app`, the Marked.js needs to be added and imported where needed.

_Install the library_

Using the command line interface, Marked.js can be installed locally through `npm`.

```code
npm install -g marked
```

_Add the library_

Afterwards and in the project folder, the library can be included in the `package.json` file, which trackes the dependencies used in the project.

```code
npm install marked --save
```

Alternatively with yarn: 

```code
yarn add marked
```

_Use the library_

In the component which makes use of the library's functionalities, the library needs to be imported to have access to its nested functions and/or variables.

```JS
import React from 'react';
import marked from 'marked';
import './OutputArea.css';
```

From there, and with the particular project in mind, the library can be included in the component's design:

```JS
let markdown = marked(props.textarea, {headerIds : false, smartypants: true});
```

In this last snippet, the `marked()` function is a method of the imported library. The arguments of the function will be a topic of a following section.

**innerHTML**

Marked.js takes as main input the string which it to be interpreted with markdown syntax. In turn, it outputs a string, made up of HTML elements.

|Input|Output|
|---|---|
|hello there|`<p>hello there</p>`|
|# main title|`<h1>main title</h1>`|

Including the return element straight in a div will therefore include a string, made up of HTML syntax.

```JS
const OutputArea = (props) => {
  let markdown = marked(props.textarea, {headerIds : false, smartypants: true});
  return (
    <div className="OutputArea" >
      { markdown }
    </div>
  );
}
```

To have the component display the actual elements, it is necessary to append, include the HTML elements and not the string which accommodates them. This is allowed by setting the inner HTML of the div, through React's [dangerouslysetinnerhtml](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml).

Included as an attribute of the `div` which benefits from it, `dangerouslysetinnerhtml` accepts as argument an object with a key of `__html`. In this field, the string making up the HTML syntax can be included to render the HTML elements, as children of the element.

_Small note_: as the attributes include a JS object, you need to wrap the object within curly brackets, effectively having two pairs of them (one pair for the object, one pair for the inclusion of JS code in JSX).

```JS
const OutputArea = (props) => {
  let markdown = marked(props.textarea, {headerIds : false, smartypants: true});
  return (
    <div className="OutputArea" dangerouslySetInnerHTML={{ __html: markdown }}>
    </div>
  );
}
```

<!-- TODO: add notes on

ONLY THEN
- add user stories to pass the fcc test suite

The issue of styling the project comes after all the mentioned todos are completed
-->