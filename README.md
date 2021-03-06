In this `README`, I include notes on the thought and development processes behind the project. 

As I made use of `create-react-app` to set up a development environment, I will include the present repository the public and src folders. Alone they will not be able to finalize the project, but as I build the applications, these are the folders in which most of the work is done.

To have immediate feedback online I also leverage codepen. You can find the working pen right [here](https://codepen.io/borntofrappe/pen/OwPdmZ).

# Preface

In the line of 'Front End Libraries Projects' for the _freeCodeCamp_ curriculum, the second project concerns the creation of a simple application which previews markdown syntax. Much alike the referenced [example](https://codepen.io/_freeCodeCamp_/full/GrZVVO).

It is an excellent project, in that it allows to practice existing knowledge in HTML, CSS and JS. At the same time it allows to include new technologies in [React](https://reactjs.org/) and the JavaScript library [Marked.js](https://github.com/markedjs/marked). All while building something functional, which can actually be used for note-taking efforts. 

Almost every day, as I find myself tinkering with new projects, I start with a `README` file explaining the purpose of the effort which follows. Said `README` file is exactly written in markdown syntax, so I see the value of this application first hand.

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

## User Stories

It was advisable to include this section at the top of the `README` file, but as I wanted to experiment with the technologies behind the project, I neglected the conditions set by freeCodeCamp in their test suite.

Several user-stories need to be fulfilled:

- [x] the `textarea` element has an `id="editor`;
- [x] the element in which the markdown syntax is displayed has an `id="preview"`
- [x] as text is included in the `#editor`, the `#preview` element is updated with the contents of the `textarea`
- [x] GitHub flavored markdown is rendered as HTML (with _Marked.js_)
- [x] by default, the `#editor` ought to contain markdown syntax for a few elements:
  - [x] a header (h1)
  - [x] a sub header (h2)
  - [x] a link 
  - [x] inline code
  - [x] code block
  - [x] a list item
  - [x] a blockquote
  - [x] an image
  - [x] bold text
- [x] the syntax present by default is rendered as HTML
- [x] a link in the `#preview` element opens a new tab to the URL link
- [x] carriage returns are rendered as line breaks, `br` elements


**Notes on user stories**

The core of the project was accomplished without actually caring for the user stories. Even if most tests were practically left unfulfilled, this meant that the code base needed simple adjustments to create a passing project.

Beside simple additions in terms of including `id`entifiers on the `textarea` and `div` elements, a more relevant modification required looking over the documentation of [Marked.js](https://marked.js.org/#/README.md#README.md) once more.

In details, the `marked()` function required to include a particular set of options.

The `marked()` function accepts, among many, one argument for the string which is to be interpreted using markdown syntax and one argument accepting advanced options to manage the way the markdown is compiled to HTML. This set of options is included with an object, specifying with different keys [different configurations](https://marked.js.org/#/USING_ADVANCED.md#options).

For the project at hand, the following flags were included to pass the remaining tests:

- breaks: true
- xhtml: true

Alongside the default options, mainly `gfm` which sets the GitHub flavored markdown specification, these allow to 1) include soft and hard breaks and 1) include self-closing tags for those elements that have no content (among which `<br/>`).

```JS
let markdown = marked(props.textarea, { breaks: true, xhtml : true });
```

**Last Issue**

With the inclusion of `id` attributes and appropriate options, one remaining tests remains before the project can be considered completely closed.

> OPTIONAL BONUS : When I click a link rendered by my markdown previewer, the link is opened up in a new tab (HINT: read the Marked.js docs for this one!)

> AssertionError: All Links should target _blank: expected 1 to equal 0

As suggested, a read through the documentation provides a possible solution for this last issu. Among the options, it is indeed possible to include a `renderer`, an object which allows to modify HTML elements and to include arbitrary strings/atributes. You can read moer about it [right here](https://marked.js.org/USING_PRO.md).

Looking at the documentation, a renderer can be included while modifying the use of the _Marked.js_ library. Instead of including the `marked()` function, it is indeed possible to include a reference to the library, and have it build the function with the different options.

`marked` holds a reference to the `marked()` function, and is capable to 1) generate the desired renderer function and 1) include the different options through the `setOptions()` method.

One step at a time. For the renderer, a new instance can be created through the variable already defined.

```JS
const renderer = new marked.Renderer();
```

This is an object which allows the specification of rules as to how HTML elements. For anchor link elements (the different available elements are listed in the [docs](https://marked.js.org/USING_PRO.md)), the `link` property allows to specify a function, to render anchor link elements as desired.

```JS
renderer.link = function(href, title, text) {}
```

This is a function accepting three arguments, for attributes typical of the element and returns the structure of the element itself. For the particular use case of the project, the `href` and `text` attributes are included as-is. In the opening `<a>` tag, the attribute of `target` is then added with a value of `_blank`.

```JS
renderer.link = function(href, title, text) {
    return `
            <a href=${href} target="_blank">
              ${text}
            </a>`;
};
```

This accounts for the creation of the `renderer` object fulfilling the project's user story. Once created, the object can be then included alonside the different options, through the aforementioned `setOptions()` function.

```JS
marked.setOptions();
```

This function too accepts as argument an object, with the different options specified through the keys documented on the [library's page](https://marked.js.org/#/USING_ADVANCED.md#options).

```JS
marked.setOptions({
  breaks: true,
  renderer: renderer,
  xhtml: true
});
```

With this code, the markdown function is generated with the prescribed options. To display the correct syntax on the page, it is then a simple matter of passing the markdown syntax as the argument of the newly crafted `marked()` function.

```JS
return (
  // include the markdown result in the HTML of the div
  <div className="OutputArea" id="preview" dangerouslySetInnerHTML={{ __html: marked(props.textarea) }}>
  </div>
);
```
