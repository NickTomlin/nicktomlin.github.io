---
layout: post
title: JSX with Emmet Vim
date: '2017-06-10'
disqusId: 2017/06/10/jsx-with-emmet-vim
---

> Apparently I'm very bad about writing blog posts; I'm going to try and do more bite sized "tactical" updates like this and see how it goes

I've used the excellent [emmet.vim](https://github.com/mattn/emmet-vim) for quite some time but had never gotten around to fixing some pesky annoyances when dealing with JSX: the default `class` won't work with JSX and that double quoted attributes are pure evil. After perusing [this emmet vim issue](https://github.com/mattn/emmet-vim/issues/255) (from 2015! I'm way behind the times!) and trying one of the many solutions thrown out in the thread, I found the following configuration for Emmet Vim suited my needs:

```viml
" .vimrc
let g:user_emmet_settings = {
\  'javascript.jsx' : {
\      'extends': 'jsx',
\      'quote_char': "'",
\  },
\}
```

I am now happily Vimming away:

<script type="text/javascript" src="https://asciinema.org/a/124232.js" id="asciicast-124232" async></script>

Please share any tricks/tips for productive emmeting in the comments. Cheers!
