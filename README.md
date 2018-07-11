<!-- In the README, I include the thought and development process behind the project. I use locally `create-react-app` to set up a development environment, but also use codepen to have immediate feedback online.

Link to the work-in-progress pen right [here](). -->

# Preface

In the line of 'Front End Libraries Projects' for the freeCodeCamp curriculum, the second challenge concerns the creation of a simple application which previews markdown syntax. Much alike the referenced [example](https://codepen.io/freeCodeCamp/full/GrZVVO).

It is an excellent project, in that it allows to practice existing knowledge in HTML, CSS and JS. At the same time it allows to include new technologies in [React](https://reactjs.org/) and the JavaScript library [Marked.js](https://github.com/markedjs/marked). All while building something functional, which can actually be used for note-taking efforts. 

Almost every day, as I find myself tinkering with new projects, I start with a README file explaining the purpose of the following effort. Said README file is exactly written in markdown syntax, so I see the value of this application first hand.

# Design

For the look of the single page application, I decided to be inspired by [Google translate](https://translate.google.com/) and also this particular [design concept](https://dribbble.com/shots/4040108-Google-translate-design-concept-2018). Translate is a perfect example of a sngle page application with two main areas: an input area and an output area. As you type in one, immediately the input is managed and displayed in the other. 

In terms of actual design, the translate application shows two areas with the same importance, while the markdown previewer app may actually divide the screen wit different ratio. Something which can be altered once the application is up and running.

Just for starters however, a few colors and font choices are included.

Colors:

- black: #252525
- white: #fff
- theme: #0083F5
- complementary theme: #F59600

Font:

- open sans 400, 700

# Development

The design of the page is undoubtedly important, but the focus of the project is the creation of a funtional application. The application is also the pre-condition for the project to pass all the tests set up by the freeCodeCamp suite.

In light of this priority check, and with the few design choices already noted above, the ultimate look of the page is delegated to a future update. Using React and Marked.js takes the priority. 


## React

**First thoughts**

Using `create-react-app` it is possible to set up a component-based environment with the most recent dependencies. Before actually using the command though, a few thoughts on the structure of the application are warranted.

The app is built with components in mind. There exist two large areas, which undoubtedly demand their own component.

- in the input component, a text area allows for user interaction. It is here possible to type text.
- in the output component, the text included in the text area is displayed. 

At first it would behoove for the project to start with the simplest possible use-case, namely displaying the same exact text present in the text area. Following this first step, it would be then necessary to include the JS library to manage the text according to the markdown rules. I could see how regex could be used in stead of the library, but using another tool is always good practice to take advantage of external libraries. And learn something new.

**State**

The application needs to manage state in the quality of text. Text which is included in text area, managed and displayed in the output, preview area. As learned in the freeCodeCamp curriculum, the text area can be created as a _controlled component_: a component which is tracked for changes in content/ state, such as when text is added to a text area. The component needs to update the state, which then triggers the correct rendering in the preview area.
