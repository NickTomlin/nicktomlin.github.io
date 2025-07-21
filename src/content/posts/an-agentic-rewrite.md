---
title: "An agentic rewrite"
date: 2025-07-21
---

It's that time when I take a break from writing 1-2 blog posts per year to rewrite my site in a new blogging framework :)

I've grown increasingly frustrated by my choice of [`next.js`](https://nextjs.org/) for my blog ( [whomp whomp](https://nick-tomlin.com/posts/migrating-from-jekyll-to-next-js-initial-thoughts/)) because it was both more complicated and less functional to maintain than the original Jekyll blog it had replaced (technology!). This time, instead of rewriting by hand, I wanted to do a Gen-Ai bake-off between [`claude code`](https://www.anthropic.com/claude-code) and the [`gemini` cli](https://github.com/google-gemini/gemini-cli).

## 🎯 The challenge

Change the backing framework for my site without:

1. Manually editing code (an agent has to do it all)
2. Extensively reviewing documentation (an agent should do that too!)

## TL;DR

It worked! Here are some high level takeaways:

**Framework adoption will be driven by how well agents work with them**. Both agents could not get my first pick framework to build even with multiple prompts; I ended up choosing another framework that suited them better. I can see a world where this is table stakes for adoption, and users will just drop one framework if an agent can't work with it.

**`claude` code is the reigning champ; `gemini` is playing catchup**. Not really news, but I continue to be impressed with how `claude` continues to balance simplicity with excellence in understanding and producing code. I think a "brownfield" migration like mine with built in constraints is where this is particularly evident.

**The easy button still needs work**... This was one of the most productive agentic sessions i've had, but I still put in a lot of time futzing with prompts and design docs. There was also a fair amount of manually nudging the agents to fix things.

# The story

## Off to a bad start

I originally intended to rebuild in [11ty](https://www.11ty.dev/) because it seemed simple (e.g. the anti `next`) and had a lot of love in the community. Sadly, I found its promise of simplicity was drowned in a matrix of templating, data, and rendering options once I got past "hello world".

I was hoping that my robot friends `claude` and/or `gemini` would have a better go at it than I did, but neither of them was able to get a proper React shell and markdown core that I wanted. Both quickly got stuck in a loop of attempting various solutions (some seemingly sourced from the docs, some from ... the ether?) that all ended up failing. After a lot of prodding and more failure, we all collectively gave up.

After this, I asked the agents to recommend an option and ended up choosing [Astro](https://astro.build/) since it matched the convention driven, but React-flavored, north star I had in mind. I'd also heard cool people say it was cool 😎. This was where things really took off.

## 🚀 Away we go

I asked each agent to create a plan on how to do the migration, and made some minor edits to the `.md` file, then had them execute it. Switching to `astro` allowed me to mostly hit `yes`, barring some wacky loops where `claude` couldn't figure out why date's weren't displaying correctly and missed some `yaml` front-matter.

`claude` was able to immediately migrate my site into an astro compatible format, fix the inevitable `build` issues, produce a rendered (if slightly buggy) site. Claude struggled with translating post dates to display dates, and there were some visual inconsistencies that were the result of tailwind version upgrades. After some nudging and hooking it up to the playwright MCP, it was able to resolve formatting and styling issues without manually editing code.

`gemini` was able to get most of the project in the right places, but spun on some `css` issues with `tailwind` that it couldn't get out of. I had one frustrating exchange where it tried to tell me that `tailwind` was a server only technology and could not use `css` variables. I respect the non-sycophantic response of "this is not possible", because I had a branch where `claude` had generated working code using css variables automatically. I gave up on Gemini here, since I didn't care to spend the time fighting with it. I may continue down this path in the future to see how I can unstick it.

Overall, I was quite impressed by how both models performed, even though Gemini failed to produce a working site.

### The future of frameworks

For better or worse, my switch from `11ty` to `astro` feels like the future of framework wars, where instead of talking about benchmarks or mental models, tailoring to Agents is the single most important driver of adoption. I see opinionated defaults trumping hyper-flexibility.

I would feel worse about having robots make this choice for me if the `11ty` docs were better, but in this case -- and potentially many -- having API and mental modeling that is concise and well explained is actually beneficial for humans _and_ robot overlords. I'm okay with that trade off as long as the result is something that is both easier to understand and maintain.

For cases where framework choice is forced, and the framework is poorly documented, internal, or both, I think humans and A.I. are going to have a real struggle. This is going to be particularly challenging when the world might be benchmarking against agent friendly frameworks (or problems). I hope there's more time devoted to realistically mapping out capabilities here.

## Closing thoughts

This was one of the most pleasant and productive A.I. sessions I've had and a nice taste of a future where A.I. is more like a genie and less like an over-eager intern.

Feel free to peruse [the PR](https://github.com/NickTomlin/nicktomlin.github.io/pull/63). There was some follow up work removing duplicate directories that `claude` didn't catch, but most of the work happened in a few sessions of agentic coding where I barely touched my editor.
