---
layout: post
title: Speeding up zsh loading times by lazily loading nvm
---

A [friend of mine](https://twitter.com/lejeunerenard?lang=en) was doing some spring cleaning on his shell and it prompted me to go on my own journey.

After running `/usr/bin/time zsh -i -c exit` I found out that my load time for zsh was _over 4 seconds_ 🙀. This was apparently something that I had just gotten used to but seeing the numbers in the cold light of my terminal made me realize that something had to change.

After some frantic Googling, I found Benny C. Wong's excellent post on [speeding up oh my zsh](https://bennycwong.github.io/post/speeding-up-oh-my-zsh/) which pointed at NVM and RVM as likely culprits. I quickly removed NVM from my `.zshrc` and saw startup times go to 0.14 seconds!

The only wrinkle there is that I know needed to manually load `nvm` when I wanted to use it, which was not super great for my JavaScript heavy workflow. That same friend had the idea of loading nvm when cd-ing into a directory and I took that and modified some existing `chpwd` [zsh hook](http://zsh.sourceforge.net/Doc/Release/Functions.html#Hook-Functions) to lazily load `nvm` and `nvm use` if I cd'ed into a directory with an `.nvmrc`:

```zsh
# ~/.zshrc
function load-nvm () {
  if [[ $(uname -s) == "Darwin" ]]
  then
    export NVM_DIR=~/.nvm
    [[ -s $(brew --prefix nvm)/nvm.sh ]] && source $(brew --prefix nvm)/nvm.sh
  else
    [[ -s "$HOME/.nvm/nvm.sh" ]] && source "$HOME/.nvm/nvm.sh"
  fi
}
# NVM

load-nvmrc() {
  if [[ -f .nvmrc && -r .nvmrc ]]; then
    if [ -x "$(command -v nvm)" ]; then
    else
      load-nvm
    fi
    nvm use
  fi
}
add-zsh-hook chpwd load-nvmrc
```

I now have a _much_ snappier shell that loads `nvm` when I cd into a node project. 🎉
