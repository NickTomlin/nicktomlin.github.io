---
layout: post
title: Hacking on Jquery
date: '2013-03-19'
comments: true
published: false
external-url: null
categories: null
disqusId: /2013/03/19/hacking-on-jquery
---

Javascript is a beautiful language, and even though I am an apprentice programer, my favorite of the handful of languages I can code in.

jQuery is a monolith on the front-end side of things. If I did not use JS in other projects (or use node), it would be my only interaction with the language. In some ways, this is a beautiful thing. Parsing the DOM by hand, while not insanely difficult (Especially with newer ECMA functions like ``getElementsByClassName``) is time consuming. jQuery dramatically reduces the boilerplate code I would have to write over and over again. Still, It bugs me that I end up needing to include it on projects simply because they require functionality that is slightly above the scope of what I can do with Vinalla JS.

To combat that, and follow the "Use the Source" [pattern](http://ofps.oreilly.com/titles/9780596518387/perpetual_learning.html#use_the_source), I decided to crack open the jQuery source and do some digging whenever I did something with jQuery.

After a day of doing this, I realized how little I understood about jQuery's dom selection methods, and decided I would go a level deeper and look at [Sizzle](http://sizzlejs.com/) (the selector engine that jQuery runs on top of).


So far I am:

1. Impressed by how much work jQuery does. It's easy to say "why use a 45k library when you can write Vanilla js", but that gets a lot harder when you actually start cutting cross-browser code.
2. Hybridize. After seeing the way that jQuery works, I am a lot less afraid to mix Vanilla js with jQuery. ``this`` is not so different from ``$(this)``, and in many casses the two can be used interchangably.

## The future:

I agree with the creators of [ender](https://github.com/ender-js/Ender) that modularized "no-library libraries" are the way to go. I'm still digging into jQuery, but I am going to start using Ender on smaller projects.
