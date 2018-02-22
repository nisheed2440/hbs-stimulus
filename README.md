![fractulus-logo](/src/fractulus/assets/fractulus-logo-small.png "Logo")

Version **1.0.0**
---
Fractulus is a component creation framework that allows you to author and demo the components in isolation with the correct contexts. Fractulus - is derived from two open source projects [Fractal](https://fractal.build/) and [Stimulus](https://stimulusjs.org/). This framework was created out of necessity for AEM/Wordpress projects, having a way in which front end and back end developers can work in isolation using a handlebars rendering engine.

Stimulus is used so that the developer can implement basic MVC pattern in components rendered via handlebars. This allows multiple instances of the component rendered, each having its own scope and state.

Out of the box Fractulus sets up a `test` component under `src/components/components/test` with a Stimulus controller which handles the basic use cases of state management.

## Installation
```
$ git clone https://github.com/nisheed2440/hbs-stimulus.git my-fractulus
$ cd my-fractulus
$ npm install
```

## Development
```
$ npm start
```
This starts a development server @ `http://localhost:3000`. Changes to any of the files inside the `src` folder are now tracked and the server reloads to reflect those changes.

## Deployment
```
$ npm run build
```
Once all the changes are done, the fractulus sytleguide can be published either through [github pages](https://pages.github.com/) or via a custom heroku app or some other simple web server. 