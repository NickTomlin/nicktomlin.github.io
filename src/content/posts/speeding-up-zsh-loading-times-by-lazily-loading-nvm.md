---
title: Speeding up zsh loading times by lazily loading nvm
date: '2018-03-10'
---

A [friend of mine](https://twitter.com/lejeunerenard?lang=en) was doing some spring cleaning on his shell and it prompted me to go on my own journey.

After running `/usr/bin/time zsh -i -c exit` I found out that my load time for zsh was _over 4 seconds_ 🙀. This was apparently something that I had just gotten used to but seeing the numbers in the cold light of my terminal made me realize that something had to change.

After some frantic Googling, I found Benny C. Wong's excellent post on [speeding up oh my zsh](https://bennycwong.github.io/post/speeding-up-oh-my-zsh/) which pointed at NVM and RVM as likely culprits. I quickly removed NVM from my `.zshrc` and saw startup times go to 0.14 seconds!

The only wrinkle was that I now needed to manually load `nvm` whenever I needed to use it, which was less than ideal for my JavaScript heavy workflow. That same friend had the idea of loading nvm when cd-ing into a directory and I took that idea and modified some existing `chpwd` [zsh hooks](http://zsh.sourceforge.net/Doc/Release/Functions.html#Hook-Functions) to lazily load `nvm` and `nvm use` if I cd'ed into a directory with an `.nvmrc`:

```shell
# ~/.zshrc
function load-nvm () {
  if [[ $OSTYPE == "darwin"* ]]; then
    export NVM_DIR=~/.nvm
    [[ -s $(brew --prefix nvm)/nvm.sh ]] && source $(brew --prefix nvm)/nvm.sh
  else
    [[ -s "$HOME/.nvm/nvm.sh" ]] && source "$HOME/.nvm/nvm.sh"
  fi
}

load-nvmrc() {
  if [[ -f .nvmrc && -r .nvmrc ]]; then
    if ! type nvm >/dev/null; then
      load-nvm
    fi
    nvm use
  fi
}
add-zsh-hook chpwd load-nvmrc
```

Edit: I originally used `command -v` which doesn't seem to recognize `nvm` properly, hit tip to Sean for switching to `type`

I now have a _much_ snappier shell that loads `nvm` when I cd into a node project. 🎉
