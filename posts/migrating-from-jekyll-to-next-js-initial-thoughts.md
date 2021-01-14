---
title: "Migrating from Jekyll to Next.js: Initial thoughts"
date: 2021-01-14
excerpt: "This post describes the ups and downs of transitioning my blog from Jekyll to Next.js"
---

This post describes the ups and downs of transitioning my blog from [Jekyll](https://jekyllrb.com/) and [Github Pages](https://pages.github.com/) to [`next.js`](https://nextjs.org) and [netlify](https://www.netlify.com/).

️🏔🧗 The journey ️🧗 🏔
---

I've wanted to try something new for my personal site for a very long time. There are a few major reasons why I haven't made this transition before:

### Core problems

#### Tooling fatigue

As of this writing [Jamstack](https://jamstack.org/generators/) lists 314 different static site generators. Each with their own helpful intros and dedicated user base. That's too many!

#### Knowledge overhead

I am a full stack engineer comfortable with JavaScript and dealing with the ever-expanding JS ecosystem. It's what I get paid to do. I do not want to have to learn an entire static site generator ecosystem to create a blog (sorry Gatsby!).

#### Bad abstractions

I felt that "simple" tools often forced me down paths that I did not want to go (using templates, using a specific pre-processor/framework), and "powerful" tools required learning a complicated plugin architecture to do something simple.

### The end of the road

After encountering these issues with Gatsby, 11ty, and hugo, I've finally settled over to Next.js and Netlify and couldn't be happier.

🌈🦄The good parts 🦄🌈
---

###  _great_ documentation and community

Having docs is great, but having _good_ documentation is what matters.
Next.js has a really nice, [step-by-step tutorial](https://nextjs.org/learn/basics/create-nextjs-app) that does a great job of balancing major concepts while still delivering immediate feedback.

### A balanced level of abstraction

Providing something that is both understandable and powerful is a difficult task. With other frameworks, I found myself dealing with a mess of plugins/configuration to get something working, or forced into "one right way" of doing things.
[`next.js`](https://nextjs.org) does an admirable job of providing things like hot-reloading and bundle optimization while still allowing me to write an application in a familiar way, with tools I know and love.


### Configuration friendly

Next takes a "zero config" approach by default, but layering on configuration was seamless. I ended up switching from SASS to [Tailwind](https://tailwindcss.com/) and I was able to easily configure the integration without needing to work with a strange plugin syntax. Next does some magic to pick up this configuration, but I found that any issues I had were typically isolated to either `next` or `tailwind which made debugging and googling a _lot_ easier than working with a third party wrapper/interface.

🌩👹 The not-so-nice parts  👹🌩
---

While next's static functionality works like a charm, there are a few quirks:

### Static site generation requires sacrifice

- As of next 10.x, You can't easily mix dynamic client side routes with static generation. Every "page" needs to have a path you know _at build time_ OR use a query param to dynamically specify contents. This isn't a deal breaker for my personal site, but is a blocker for another project that I am working on.
- [`next/image`](https://nextjs.org/docs/api-reference/next/image) does not work with static sites, since it relies on a server to generate the correct image for a given breakpoint. This forces you to either use a CDN that provides similar services, or switch to non-static routes.

### 3rd party integrations can be finicky

While using SASS was a snap, converting to tailwind/postcss took some effort. I ran into some [strange behavior](https://github.com/vercel/next.js/issues/13488) that led to extremely slow build times. This wasn't Next's fault, but it was a time sync for me to figure out.

✌️🕊 Parting words 🕊✌️
---

After all of this, I still believe that the simplest tool for the job is the best one. I'm really grateful for Jekyll, and I would still recommend Jekyll + Github pages to anyone that wants a simple and effective blogging solution.

I'm very happy with how `next.js` has turned out so far, and very excited for the possibilities that it opens up for my site.
