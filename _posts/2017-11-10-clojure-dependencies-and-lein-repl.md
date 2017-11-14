---
layout: post
title: Issues loading dependencies in the Clojure repl
---

I've been dusting off my _very dusty_ Clojure parens and recently ran into a head scratcher when attempting to mess around with [enlive](https://github.com/cgrand/enlive) in a Clojure repl.

When attempting to follow along tutorial I naively popped open my repl and attempted to require enlive like so:

```
(require [net.cgrand.enlive-html :as html])
```

And received the following lovely exception:

```
CompilerException java.lang.ClassNotFoundException: net.cgrand.enlive-html
```

Thanks to [this](https://stackoverflow.com/a/9811346/1048479) informative stackoverflow post, I was reminded of the difference between `require` nested within the `ns` macro and `require` run inside of a repl.

The solution is to do the work the `ns` macro is doing for you, namely, to quote the vector you are passing to `require`:

```
(require '[net.cgrand.enlive-html :as html])
(html/text (first (html/select (html/html-resource (java.net.URL. "https://clojure.org"))  [:.clj-header-message])))
```

[Quoting without confusion](https://8thlight.com/blog/colin-jones/2012/05/22/quoting-without-confusion.html) is a good reference here if you (like me) get confused by quotes.

Additionally, for easy `repl`ing, it's probably easier to do this with `use` (which will clobber your current namespace but is worth it for hacking) or to stick this all in a file and use the `load`/`in-ns` combo (more on that [here](https://www.beyondtechnicallycorrect.com/2013/04/14/loading-and-using-namespaces-in-the-clojure-repl/)):

```clojure
; e.g. for src/my_ns.clj
; that has a ns of `my-ns`
(load "my_ns.clj")
(in-ns 'my-ns)
; you can now access variables defined in that namespace
(my-ns/my-func "argc")
```

Hopefully this helps shortcut someone else. Cheers!
