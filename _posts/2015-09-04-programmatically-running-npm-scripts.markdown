---
layout: post
title: "Programmatically running npm scripts"
date: 2015-09-04 17:32
comments: true
categories: npm node
---

npm has become an essential part of my tool-chain, and I often use the `scripts` entry in lieu of build tools like Gulp or Grunt for small to medium sized projects. One issue that I've encountered is wanting to kick off tasks stored in the `scripts` without actually running `npm` on the shell. Googling did not lead to any easy answers, but the solution was readily apparent from the `npm-cli` [source](https://github.com/npm/npm/blob/master/bin/npm-cli.js#L69).

Once you have installed npm locally `npm i npm --save` [insert "Yo dawg..." reference here], you can require and use it:

~~~ javascript
var npm = require('npm');

npm.load({}, function (er) {
  if (er) { return; }
  npm.commands.run(['test']);
});
~~~

This is obviously a very simplistic use case, but hopefully it provides some food for thought. Let me know if you are able to build something interesting with it.

Edit
===

In the comments, @bfredit noted that you can use the [`global-npm`](https://www.npmjs.com/package/global-npm) module to avoid bringing the hefty `npm` package locally.
