---
title: "Why Bother?"
date: 2026-04-12
---

Dear reader, 

I would like to celebrate! After two-ish years of odd nights and weekends, I have completed ["Crafting Interpreters"](https://craftinginterpreters.com/): Robert Nystrom's excellent intro to building a programming language (it's free online, but if it interests you, please buy a copy!).

With that little celebration out of the way, let's ask the natural question in the year-of-our-claude 2026: "Why bother?"

## The modern approach

I see increasing industry movement towards the idea that **Code is a low level, increasingly insignificant, [abstraction](https://martinfowler.com/articles/2025-nature-abstraction.html))**. LLMs can easily churn out code (including [compilers](https://www.anthropic.com/engineering/building-c-compiler). Indeed, Claude created a [working bytecode VM](https://github.com/NickTomlin/robot-lox) in the time it took me to complete the first chapter of the book by hand. 

The dream seems to be that we move to 'spec' or ['harness' engineering](https://openai.com/index/harness-engineering/) where humans focus on requirements and evaluation and machines take care of the details, just like most of us no longer write assembly.

I'm still learning about this, and will resist hot takes here, but I will try to offer some thoughts.

## Your brain on code

Reading code can be transformative. Taking the time to dive deeply into something, whether that is a novel, a poem, or a piece of [`C`](https://github.com/gwsw/less), is how I expand myself as a person. That expanded sense of thought is the thing that lasts beyond the code, project, or language. This is the "personal growth" that I ultimately want in a career, versus acquiring bullet points like "proficient in Ruby".

For example, Clojure was my strange gateway drug into a functional, lisp-y way of thinking (and my brief lost weekend with Emacs -- let's not talk about that). I should not be trusted in a Clojure codebase now, but I am forever grateful someone _did_ at one point. Clojure changed the way that I think about structuring programs and the cost/benefit of abstractions forever.

### Tradeoffs

As agents take on more and more of the work of writing -- and reading -- code we do start to lose the benefit of language and how it affects our thinking.

This transition may simply mean we are replacing the mind-expanding effects of our chosen language with a higher level words -- or harness-focused words -- but I'm not convinced of this yet. It feels less like moving from assembly to Java and more like moving from Java to Visual Basic (now with less determinism!). Few abstractions are free, and we need to be clear as an industry what we are giving up when we push engineers away from code if we choose that path. And it certainly seems like we are choosing that path.

As individual engineers, I think it still makes sense to regularly expose ourselves to code -- especially "heirloom" code -- purely for those mind expanding effects. Think of it like walking through a gallery of old masters. The fact that we can inkjet a Rembrandt doesn't make his work any less worthy of our careful attention.

## Fundamentals still matter

As much as we may be moving away from the importance of specific languages, frameworks, and runtimes, all computing is still bound by fundamentals of space and time -- [for now](https://arstechnica.com/security/2026/03/google-bumps-up-q-day-estimate-to-2029-far-sooner-than-previously-thought/). Namely, memory and computation. It may matter less if someone knows `python` or `ruby` but it still matters that they understand how whatever the LLM writes for them _runs_. In many ways the runtime aspect is becoming increasingly important as we start to build runtimes around agents for sandboxing or context constraining purposes.

These are also things that _you_ own. If you move to a new employer, you can't take their context architecture with you, but you can take the things that you know deeply.

## I'd do it again

Even if I could get a refund of the time I've invested and pour it into some LLM specific topic, I wouldn't. While, I don't ever plan on writing a compiler "by hand", I've already seen the mindset shift in my day job working with the JavaScript toolchain. Additionally, the knowledge of the internals of a bytecode VM and many of the lower level memory management concepts that I've long passed over are priceless.

I also wouldn't even change my approach of manually typing things out. My old fashioned lizard brain learns best the old, hard, and crufty way. The struggle of breaking down a problem bit by bit gives me a much richer perspective, even if I'm typically sitting comfortably behind an agent. Sometimes you just need to move slow, as counter cultural as that may be.

I _would_ lean on LLMs more! I started in the second half of the book where `Claude` helped me understand some of the `C` fundamentals I'd missed; it also helped clarify or colour hard to grok sections. I'd also create more toy languages to play around with concepts as I went, and get a guided tour of codebases like [lua](https://github.com/lua/lua).

This mix of "old fashioned" and "modern" feels like the pragmatic balance for the present. Given the rapid pace of evolution in this space, it's anyone's guess whether that will hold true in the coming weeks or months.
