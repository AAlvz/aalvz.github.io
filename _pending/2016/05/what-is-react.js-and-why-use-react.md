---
title: What is React.js and why we use it?
tags: Frontend, React.js, Redux
---

We are using [React.js](https://facebook.github.io/react/index.html), a JavaScrip library for creating user interfaces, we use [React.js](https://facebook.github.io/react/index.html) because is simple, clean and elegant code, and easy to maintain. For official documentation look at [Getting Started](https://facebook.github.io/react/docs/getting-started.html) or [Tutorial](https://facebook.github.io/react/docs/tutorial.html) pages.

**From my point of view, React has the following advantages:**

* Good if you want to build large applications with data that changes over time.
* **Virtual DOM**. React abstracts away the DOM (a programming API for HTML and XML documents), you diff that with the actual DOM, and only update what changed. This makes updates faster.
* Perfect to render UI components.
* Offers incredible performance and server side rendering.
* You can always change how the component will render modifying a source file.
* Building Javascript and HTML into JSX makes components easily understandable.
* React.js is declarative, which means that React conceptually hits the “refresh” button any time data changes.
* You can use React.js seamlessly with Node.js or AngularJS.
* Uni-directional data flow.
* It has the ability of returning an HTML component from a function.

This is an component example:

<iframe width="100%" height="300" src="//jsfiddle.net/69z2wepo/41203/embedded/js,result/dark/?fontColor=fff" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

**Recommendations:**

* Use [React.js](https://facebook.github.io/react/index.html) only if your application has a lot of dynamic content.
* Break the UI into a component hierarchy.
* Use [Redux](http://redux.js.org/) instead of [Flux](https://facebook.github.io/flux/). Redux is able to cut some complexity corners by using functional composition, Redux makes certain abstractions easier, or at least possible to implement, that would be hard or impossible to implement in Flux.
* Write tests of each of your components.
* **Use ES6, Babel, Webpack, and NPM**. Once you have added Babel, there is no reason not to go all out and use all the great ES6 features, like constants, arrow functions, default arguments, array and object destructuring, spread and rest operators, string interpolation, iterators and generators, a decent module system, etc. Use Webpack for bundling our code, and NPM for package management.
* Use the React and Redux dev tools.
* Write small components.

**Here are some project using React: [React.js](https://facebook.github.io/react/index.html):**

* Netflix.
* AdRoll.
* Airbnb.
* Atlassian.
* Coursera.
* Docker.
* Dropbox.
* Deezer.
* IMDb.
* Paypal.
* Wolfram Alpha.
* Zendesk.

If you know the absolute basics use [React Slingshot](https://github.com/coryhouse/react-slingshot) starter kit for rapid application development using [React.js](https://facebook.github.io/react/index.html).

**That's it!**

If you enjoyed this post, you might like to follow me on [Twitter](https://twitter.com/ileonelperea), and follow me on [Github](https://github.com/iLeonelPerea).

Thanks for reading!