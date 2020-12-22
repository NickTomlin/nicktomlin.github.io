---
layout: post
title: VimL Functions
date: '2017-07-12'
disqusId: 2017/07/12/viml-functions
---

I've started a slow descent into the madness that is VimL. One of the things that I've found to be initially confusing is how Vim deals with functions. This may be very obvious to some but It caused me enough head scratching to warrant recording some thoughts here.

<details class="tldr" markdown="1">
  <summary>Cheatsheet</summary>

```vim
" All VimL functions must be called
" Operations like assignment
" or passing to another function or built in
" implicitly call a function
let var = MyFunc()
echo MyFunc()

" Otherwise, you _must_ :call a function
call MyFunc()

" You can also store a reference to your function
let FuncRef = function('MyFunc')

" and :call it with arguments or pass it to another function
call(FuncRef, 1, 2, 3)

" Or, stringify and execute it
execute 'echo ' . string(FuncRef)

" Bonus: Lambdas (vim8+ and neovim) are pretty swank
let MyLambda = { str -> str . '!' }
echo MyLambda('yay')
" yay!

echo map([1, 2, 3], { _, val -> val * 2 })
" [2, 4, 6]
```
</details>

# Getting func-y

Having one way to call a function is boring: most languages have a few different ways to invoke a function you or someone you love has defined. Not to be outdone, VimL has some twists of its own related to functions.

Let's create a very simple function:

```vim
" All Viml functions must begin with a capitol letter
function! Hello(name)
  " :wave: Just in case you were wondering
  " all named arguments are only available on the magical
  " arguments dictionary (a) within the function
  return "Hi " . a:name . "!"
endfunction
```

The easiest way to call this function in a script, we could simply assign it to a variable, or pass the result of invoking it to a built in like `echo`:

```vim
let greeting = Hello('bob')
echo greeting
"Hi Bob!"
echo Hello('bob')
"Hi Bob!"
```

This makes a _lot_ of sense! We've always been told that VimL doesn't make much sense; it feels good to prove people wrong doesn't it?

But, let's say we just want the side effects of a function and do not want to deal with whatever it returns. It'd make sense to do the same thing but just not assign it right?

```vim
MySideEffectFunc('some side effecty argument')
E492: Not an editor command: MySideEffectFunc()
```

Not so fast! VimL has other ideas; while certain built in commands (like `echo`) can be invoked, functions cannot simply be called without passing or assigning their value. This is because things like `echo Foo()` and `let x = Foo()` implicitly evaluate or call any expression they are handed (in this case, the expression being invoking the function `Foo`). Since `Foo()` isn't good enough, we need a way to tell VimL to actually call the function.

This is where [`:call`](http://vimdoc.sourceforge.net/htmldoc/eval.html#:call) steps in. `:call` calls a function, with up to 20 arguments (because 19 just wasn't enough), and discards its return value.

```vim
:call MySideEffectFunc('this wooooorks')
```

Call is the _the_ way of calling functions within your plugins, or invoking other functions from ex mode.

# Show me your references

Let's explore another way we can use our functions: references. Let's take a common example, using [`map`](http://vimdoc.sourceforge.net/htmldoc/eval.html#map()) with a function we've previously defined. We can use Vim's `function` keyword to create a funcref (that is a reference to function *wink* *wink*) which allows us to pass it to `map`, `filter`, or another function.

```vim
function Exclaim(idx, name)
  return a:name . "!"
endfunction

let greetings = ['Hey', 'Howdy', 'Hi']
let exclaimed = map(greetings, function('Exclaim'))
echo exclaimed
" ['Hey!', 'Howdy!', 'Hi!']
```

If we wanted to take a more generic function that did not need to be aware of `idx`, we could use `string`ify our funcref and use `map`'s second argument (a string to be `eval`d) to invoke our function with the value of each pair we are iterating through:

```vim
function Exclaim(name)
  return a:name . "!"
endfunction

let greetings = ['Hey', 'Howdy', 'Hi']
let exclaimed = map(greetings, string(function('Exclaim')) . ('v:val'))
echo exclaimed
" ['Hey!', 'Howdy!', 'Hi!']
```

That works, but it's not very readable. Luckily, more modern versions of Vim have an answer.

# Lambdas to the rescue

If we, or our intended users, are using vim8+ or neovim, we can use the new lambda syntax to simplify things:

```vim
function Exclaim(name)
  return a:name . "!"
endfunction

let greetings = ['Hey', 'Howdy', 'Hi']
let exclaimed = map(greetings, {key, val -> Exclaim(val)})
echo exclaimed
" ['Hey!', 'Howdy!', 'Hi!']
```

We can even remove our simple function entirely and perform our string modifications within the Lambda if we want:

```vim
let greetings = ['Hey', 'Howdy', 'Hi']
let exclaimed = map(greetings, {key, val -> val . '!'})
echo exclaimed
" ['Hey!', 'Howdy!', 'Hi!']
```

# That's it!

There's so much under the hood with VimL but effectively using functions is a great way to get started writing a simple script or plugin to help make your life better. I hope this helps remove some of the confusion that I initially had.
