---
title: "My migrating from Jekyll to Next.js: Technical Challenges"
date: 2021-01-25
---


This post describes technical details of migrating from [Jekyll](https://jekyllrb.com/) and [Github Pages](https://pages.github.com/) to [`next.js`](https://nextjs.org) and [netlify](https://www.netlify.com/). For the story of the migration, see [the sibling post](/posts/migrating-from-jekyll-to-next-js-initial-thoughts).

# The work

I had a very simple Jekyll site and I wanted to move it to Next.js. The work was relatively straightforward, but there were some hiccups.

## Converting from liquid to JSX

This was something I had to do manually. For some pages, I could simply `mv foo.html foo.jsx` but for others that used a lot of liquid syntax, I needed to replicate the logic in JavaScript/JSX. This wasn't too bad:

This liquid template:

```html

{% for post in site.posts limit:6 %}
<li>
  <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>

  <h4>
    <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
  </h4>
</li>
{% endfor %}

```

became:

```jsx
 {posts.slice(0, 4).map(post => (
   /* additional markup omitted for brevity... */
  <Date date={post.date} />
  <Link className="text-lg" href={post.href}>{post.title}</Link>
))}
```

There may be some magical Liquid to JSX converter out there, but writing one was not worth my time for this project.

## Converting slugs

My Jekyll site had deeply nested post slugs in the format of `[year]/[month]/[day]/[id]`. I initially went down the route of replicating this pattern, but decided to simplify to just `[id]`. There were two reasons for this:

- The "convention based" nested routes in `next.js` made generating and navigating between posts complicated, especially with file-based static site generation
- For a low throughput blog like mine, the granularity of `[year]/[month]/[day]/[id]` was overkill and not a good look anyway

If you happen to need that granularity, by all means use either nested directories and a compound Key in `next.js` but know that it will make your content a little more complicated for it.

### Managing redirects

While simplifying the url made things easier (and more readable IMHO), it broke SEO. To get around this, I wrote a [script][1] to harness `netflify`'s [redirect file](https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file) a to preserve some semblance of this after the migration.

## Implementing markdown

Out of the box, Jekyll supports markdown with [Kramdown](https://kramdown.gettalong.org/) and syntax highlighting in code snippets with [rouge](http://rouge.jneen.net/). Next.js has no support for this, but adding it is trivial.  I replaced [Kramdown](https://kramdown.gettalong.org/) with [remark](https://github.com/remarkjs/remark) and Rouge with [`prism`](https://prismjs.com/).

Normally I would have balked at all this work, but because of the fact that `next.js` is built like a React app, assembling these pieces was easy. I wasn't dealing with weird `next.js` plugins or overriding things with custom config blobs; just writing application code. All that functionality boiled down to about [10 lines of code](https://github.com/NickTomlin/nicktomlin.github.io/blob/master/lib/markdown.js#L5-L13).

Converting the existing posts was done through a [a script][1].

## Reloading on markdown changes

Jekyll automatically re-builds a site on changes to posts. It's slow, and doesn't refresh the browser, but it works. Next has blazing fast reloads for JS files, but doesn't know how to watch things outside of your application code (like my `posts` directory in this case). I was able to get this working using the [next-remote-watch](https://github.com/hashicorp/next-remote-watch) module.
So far, everything is fine, although there are some major caveats because it depends on internal APIs.

# The long and winding road

At the end of the day, I still just have a basic blog that is written in Markdown. But I've gained greater flexibility in how I style and process my content, as well as moving to a toolchain that is closer to my day to day work (especially now that I no longer get paid to write Ruby).

[1]: https://github.com/NickTomlin/nicktomlin.github.io/blob/master/scripts/migrate-posts.js
