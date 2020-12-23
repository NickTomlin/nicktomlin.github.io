---
layout: post
title: Programmatically running npm scripts
date: '2015-09-04'
comments: true
categories: npm node
disqusId: /2015/09/04/programmatically-running-npm-scripts
---

npm has become an essential part of my tool-chain, and I often use the `scripts` entry in lieu of build tools like Gulp or Grunt for small to medium sized projects. One issue that I've encountered is wanting to kick off tasks stored in the `scripts` without actually running `npm` on the shell. Googling did not lead to any easy answers, but the solution was readily apparent from the `npm-cli` [source](https://github.com/npm/npm/blob/master/bin/npm-cli.js#L69).

Once you have installed npm locally `npm i npm --save` [insert "Yo dawg..." reference here] or by using the [`global-npm`](https://www.npmjs.com/package/global-npm) (thanks @bfredit for the tip), you can require and use it:

~~~ javascript
var npm = require('npm');

npm.load({}, (er) => {
  if (er) { return; }

  npm.commands.run(['test'], (runEr, output) => {
    console.log(runEr, output)
  });

  // additional args can be passed as well
  npm.commands.run(['example', 'aditional', 'arg'], (runEr, output) => {
    console.log(runEr, output)
  });
});
~~~

This is obviously a very simplistic use case, but hopefully it provides some food for thought. Let me know if you are able to build something interesting with it.
