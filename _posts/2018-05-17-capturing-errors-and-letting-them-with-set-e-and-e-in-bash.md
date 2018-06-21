---
layout: post
title: Capturing errors and letting them free with set -e and set +e in bash
---

TLDR: Use `set -e` to make the current shell exit if a command run within it exists unsuccessfully and `set +e` to disable the behavior

Whether you love or hate Bash, it's hard to deny the raw beauty of Bash scripting. Portable (mostly!), surprisingly concise, and perfect for environments where you don't have (or want) the overhead of a higher level language, Bash can be a wonderful go-to when hopping between *nix environments. I've recently been using it to write some common docker `ENTRYPOINT`s for running a few services in development and ran into an issue where I wanted the behavior of `set -e` enabled, disabled, and re-enabled in same script.

`set -e`, makes the current shell exit if any command run inside of it exits with a non `0` status. While this may seem harsh at first, it's a great way to ensure that an error in one step of you script doesn't lead to undefined behavior elsewhere; it's much better to stop a script when you fail to connect to a database than have it merrily chug along trying to copy from nowhere.

Because Bash is always testing you, it would be too easy to have something like `exit_on_errors(true)` or `exit_on_errors(false)` what we do have is the wonderful `set` command. While `help set` is actually quite helpful, it's easy to miss the following line:

> Using + rather than - causes these flags to be turned off.


In my case, I had something like the following pseudocode:

```bash
#!/bin/bash

set -e

# wait for a service to spin up; exit 1 after 30 seconds
wait-for-my-service-or-exit http://my-service/healthcheck

# ensure local data uses most recent copy
command_to_check_if_data_current
DATA_CURRENT=$?

if [ "$DATA_CURRENT" -eq 1 ]; then
  # update the data from from my-service
  # if we don't have our file
  download_data_from_my_service
fi

```

But I was never getting to my `if` statement because `command_to_check_if_data_current` would exit with a `1` if the data didn't exist in the container. This was because I was using `set -e` in my script to protect against unknown failures and the `command_to_check_if_data_current` command  (which called `exit 1`) would exit the parent script regardless of whether or not it was called in a subshell.

The solution was to use a combination of `set +e` and `set -e`  to wrap my call to `command_to_check_if_data_current`:

```bash
#!/bin/bash

set -e

# ensure my-service is up
wait-for-my-service-or-exit http://my-service/healthcheck

set +e
# ensure local data uses most recent copy
command_to_check_if_data_current
DATA_CURRENT=$?
set -e

if [ "$DATA_CURRENT" -eq 1 ]; then
  # update the data from from my-service
  download_data_from_my_service
fi
```

Not cleanest code perhaps, but it allows for isolating known failures and still ensuring that unknown errors stop your script when they should.

Happy bashing!
