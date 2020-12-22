---
layout: post
title: "REM mixin for Sass"
date: 2012-07-28 14:53
comments: true
categories: sass, css
---
Update: I've switched from LESS to SASS! (Whoah!) I might write a post explaining why, but for now i'll just post a handy snippet.


## The beauty and danger of EM
I love sizing in em's but i've been bitten too many times by the weird em inheritance that can happen when i've shifted a module into a different context. It's not fun having a ``<small>`` tag scale to 92px, and it's even less fun making every last element play nice with calculations like 1.29284932930em.

## Enter the REM
Rem sizing provides the proportional benefits of ems without the dangers of em innheritance. Smarter people than I have written [about](http://blog.typekit.com/2011/11/09/type-study-sizing-the-legible-letter/) [it](http://snook.ca/archives/html_and_css/font-size-with-rem). In short, I believe it is a perfect way to responsively size elements that would normally just get a PX value for safety. It's annoying having "almost responsive" designs that scale typography or grid size, but still have buttons or images with "4px" padding.

One quick media query on ``<html>`` and a whole design scales in an instant. Beautiful!

## The mixin
Here is a quick mixin + function pair I've made (inspired by [this](http://css-tricks.com/snippets/css/less-mixin-for-rem-font-sizing/) Chris Coyier post.) to quickly set rem for a property with a PX fallback.


### Function & Mixin

~~~ scss
// returns a target / context value
@function remcalc($target,$context){
  @return ($target/$context)
}

// grabs the desired size (in px) and spits out a REM value

@mixin rem($selector,$target,$context:$root-font-size) {
  #{$selector} : ($target) + px;
  #{$selector} : remcalc($target,$context) + rem;
}
~~~

### SASS

~~~ scss
.btn {
  @include rem(padding, 12) // assuming a root font size of 16 here
}

### Output

.btn {
  padding: 12px;
  padding: 0.75rem;
}
~~~

It works great for design elements like buttons, ``<em>`` or ``<small>`` that may be dropped in to any number of contexts.

## Notes
- Rem sizing is meaningless without proper responsive calculations, and is *not* a replacement for using ems in all scenaries

- The mixin currently it only works with long-hand CSS properties like ``margin-bottom`` or ``padding-left``. Shorthand properties will have to manually use the rem calc function (`` padding: 0 remcalc(120,16) 0 remcalc(60,16);``) to return a value. Or wait until I or someone smarter writes a conditional mixin to provide that functionality
