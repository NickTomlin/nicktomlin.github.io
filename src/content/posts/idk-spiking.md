---
title: "IDK: Spiking"
date: 2024-02-19
---

I first encountered the term "spike" when someone on my team announced they were "doing a spike" at a standup and I pretended to know what they were talking about. This post is an attempt to define the term for my past self and any other fellow travelers.

# What is a spike?

In a few words: a time-limited investigation into something a team wants to accomplish, with the purpose of better understanding the length and complexity of the task. Often, this is used in estimating and breaking the work down, but sometimes it can be used to understand if the task is worth doing.

Like a prototype of proof of concept, spike code is not supposed to be production-grade and as such should generally _not be merged into your `main`_. As always, refer to [the canon](http://www.extremeprogramming.org/rules/spike.html) to know more.

## An example

My team needed to change a core part of our front-end infrastructure, that was sitting on our roadmap as a large (4-6 week) piece of work.
While we knew the general shape and size of the work, there were a lot of unknowns, especially on some of the more critical aspects. We needed to know more so we could refine
the general direction for our next quarter: the perfect opportunity for a spike.

To start, I created a document detailing some of the outcomes I was hoping for, and some of the biggest "known unknowns" that could potentially contribute to an increase in scope. My goal was not to write all the code that would be eventually needed but to write enough to get those hard-to-reach areas and understand them better.

After a week of disabling tests, hacking around safeguards, and gleefully messing with global variables, I had a much better idea of the shape of the problem. Some of the critical pieces of work were actually going to be easier than I had originally thought, and I discovered some libraries or patterns that would make them trivial; some of them were going to be harder, and I earmarked them as things to research further and tackle early when I started the work in earnest.

I didn't end my spike merging any code. Instead, I had a pull request that highlighted areas of relative ease or difficulty, a document describing the process and what I'd learned, and a much more confident estimate of how long things were going to take.

# What a good spike does

## ➕ It helps surface unknowns or blockers

The planning phase is a lot like planning a hike from a map. It's easy to draw a straightforward path from A-B and estimate how long it will take ("short hike; 10 miles: two miles an hour: 5 hours"). Unfortunately, maps can't always account for things like flooded trails or fallen trees: the inevitable hiccups of a world in motion.

The purpose of a spike isn't to drain a flooded trail or clear fallen trees, it's to gauge the size and impact of each problem and the viability of potential solutions. Or, simply to verify that it's going to be an easy hike.
The end result is a lot better understanding of the issues you'll face on the ground (or deep into the codebase) that you simply cannot know when you plan.

### ⚠️ Danger zone: Lack of breadth

If a spike stops at the "happy path" it may not be doing its job. A spike should try to not only show something can work in the best circumstances, but also uncover areas of friction, potential roadmap impacting unknowns, or future tech debt that may result from pursuing the direction of the spike. That doesn't mean a spike should get
caught up in edge cases, but it should help illuminate problem areas.

## ➕ It Increases your team's understanding of a problem

Since a spike is typically focused on illuminating the core problems and solutions to a given problem, you and your team can focus on that in isolation without being distracted by all the other requirements and ceremony that accompany a traditional production grade pull request. This extra focus not only helps provide a richer context for the eventual "prod" pull request and long-term maintenance but tends to nudge otherwise decent solutions towards greatness, simply by being able to incorporate more perspectives into the process.

### ⚠️ Danger zone: No outputs

In general, a spike should result in two things:

**An artifact**: something that the engineer(s) in charge of the spike and teammates can refer to and discuss.
This could take the shape of a document outlining what you've discovered, a PR demonstrating it, or both!

**A discussion**: an actual conversation about the results. For small work this can be a 5-minute summary in a standup ("I looked into using framework x to solve our issues with state management and it seems like it will take more time than Y but be worth it")
or a series of meetings and presentations to review and discuss. For small or 1-person teams (go you!) this can take the form of stepping back from the work and reflecting on it (journaling, talking to yourself, writing a blog post).

## ➕ It results in more maintainable solutions

When done well, the production code that follows a spike should be of higher quality _and_ easier to understand. Having taken the time to explore, and understand, almost always results in better (and hopefully less!) code in the moment and code that is easier to maintain in the future. Not taking the time, (as I sometimes do T_T) often results in corner-cutting or sub-optimal solutions.

### ⚠️ Danger zone: the false spike

If a spike gets merged into `main`, that probably means:

- It's not a true spike, since time was spent making the code production grade
- It's not production-ready! 🙀

As I mentioned earlier, there's nothing wrong with production code using elements or solutions derived from a spike, but it should be accompanied by all the things a team expects from production code (tests, docs, extra love, and care).


# A useful tool, not a process

Like a lot of terms that sprung out of the original [agile](https://agilemanifesto.org/principles.html) movement, the Spike can be useful part of a relational, customer driven model of building software. It empowers engineers to more accurately understand the commitment of time and energy involved in doing something, and to ultimately deliver more value to their users. 

If you or your team are spiking purely because you feel like you should, or it's part of some delivery checklist (prescribed by the [Agile industrial complex](https://martinfowler.com/articles/agile-aus-2018.html)), work to re-focus on that original intent. You you are working in a truly agile manner and a spike isn't benefit you, then put it back into your collection and move on!
