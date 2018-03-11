---
layout: post
title: Cron in Elixir with Quantum
---

This post showcases some examples of using [quantum] in vanilla OTP and Phoenix Elixir applications. The sample repositories are available at [nicktomlin/quantum_otp_example][1] and [nicktomlin/quantum_phoenix_example][2] respectively.

Background
---

I've been diving into Elixir and I've found to the language to be full of lovely surprises that have forced me to re-think the way I approach basic problems. One of those things I've been re-examining is the concept of regularly scheduled tasks. My first thought in doing anything on a regular basis is Cron or a job queuing framework like Resque or Delayed Job. Elixir, however, provides some great built in tools for [running scheduled tasks](https://stackoverflow.com/a/32097971) without the need for external libraries or toolchains.

I've been looking to replace an internal job at work that currently runs on cron with an Elixir OTP application. Using Elixir's schedulers worked, but managing a large number of jobs quickly got unruly. That's where [quantum] steps in to provide cron-like syntax and management for Elixir applications.

OTP: Getting Started
---

If you are still getting familiar with Elixir and OTP patterns, as I am, the terse quantum README may not be quite enough to get you up and running; I've created a small [demo app][1] that you can run locally to showcase Quantum Elixir's V2 API. Feel free to dive right in there or walk along here. I've used `mix new quantum_example` to scaffold the project.

First, let's add [`quantum`][quantum] and [`timex`][timex] to our mix dependencies:

```elixir
# mix.exs
defp deps do
  [{:quantum, "~> 2.2"},
    {:timex, "~> 3.0"}]
end
```

Then run `mix deps.get` to install things.

Create a `Scheduler` at `lib/scheduler.ex` and setup `Quantum.Scheduler`. Here `otp_app` should correspond to the atom we declare for our application in `mix.exs`

```elixir
defmodule QuantumExample.Scheduler do
  use Quantum.Scheduler, otp_app: :quantum_example
end
```

Setup your supervisor tree in an `lib/quantum_test.ex`:

```elixir
defmodule QuantumExample do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      worker(QuantumExample.Scheduler, [])
    ]

    opts = [strategy: :one_for_one, name: QuantumExample.Supervisor]

    Supervisor.start_link(children, opts)
  end

  def app_task do
    File.write("tmp/app_time.txt", "From the App #{Timex.now}", [:append])
  end
end
```

This could easily be stored in a separate `lib/supervisor.ex` but I've chosen to include everything in a single file for simplicity.

Finally, we'll need to configure a job. While Quantum does support dynamic scheduling, it's highly likely that you'll be using the static config format, so you can add the following to `config/dev.exs`:

```elixir
# config/dev.exs
config :logger, level: :debug

config :quantum_example, QuantumExample.Scheduler,
  jobs: [
    custom_task: [
      schedule: "*/4 * * * *",
      task: fn -> File.write("tmp/task.txt", "#{Timex.now}", [:append]) end
    ],
    application_task: [
      schedule: "*/2 * * * *",
      task: {QuantumExample, :app_task, []}
    ]
  ]
```

There's a few things happening here,

0. We are enabling `:debug` logging to get some nice visibility into how Quantum is running things
1. Quantum's scheduler is going to look up configuration at the atom specified by `otp_app` and then look for the Scheduler class that we included it in (in our case `QuantumExample.Scheduler`)
2. Our configuration uses Quantum's named job syntax to provide some nice meta data in our Application's logs
3. The `custom_task` executes some inline elixir code (this is probably _not_ something you want to do in production!)
4. The `application_task` uses a tuple of `{:atom, :function_name, :args[]}` to invoke the `app_task` function on our `QuantumExample` application. You can obviously use any other module and function in your application.


OTP: Running
---

Now that we've set up the necessary modules and configuration, we can actually run the code!

To start the server in the background:

```
mix run --no-halt
```

Or, to start the server and a REPL:

```
iex -S mix
```

Inspection
---

In an `iex -S mix` session, you'll see Quantum's verbose logging adding your jobs; after that you can interact with your scheduler:

```shell
09:27:23.917 [debug] [:nonode@nohost][Elixir.Quantum.ExecutionBroadcaster] Adding job :application_task
09:27:23.930 [debug] [:nonode@nohost][Elixir.Quantum.ExecutionBroadcaster] Adding job :mix_task
iex(2)> QuantumTest.Scheduler.jos
# your job information
```



You can also dynamically add jobs through the console:

```shell
iex(3)> import Crontab.CronExpression
iex(4)> QuantumTest.Scheduler.add_job({~e[1 * * * *], fn -> :ok end})
iex(5)> [debug] [:nonode@nohost][Elixir.Quantum.JobBroadcaster] Adding job #Reference<0.2079463013.1644429313.228250>
```

If you wait a bit, you'll even see some nice logging:

```shell
18:34:00.016 [debug] [:nonode@nohost][Elixir.Quantum.Executor] Task for job :application_task started on node :nonode@nohost
18:34:00.017 [debug] [:nonode@nohost][Elixir.Quantum.Executor] Execute started for job :application_task
18:34:00.024 [debug] [:nonode@nohost][Elixir.Quantum.Executor] Execution ended for job :application_task, which yielded result: :ok
```


Phoenix: Getting started
---

Since Phoenix builds on the same OTP patterns, integration with quantum is similar to that of a generic Elixir application.

Here's the [quantum phoenix exmaple repo][2]. This assumes you ran `phx.new quantum_phoenix` just like I did :)

As in the OTP example we'll need to add [`quantum`][quantum] and [`timex`][timex] to our application's dependencies:

```elixir
# mix.ex

defp deps do
  [# ... many other deps
   {:quantum, "~> 2.2"},
   {:timex, "~> 3.0"}]
end
```

After that, we create a scheduler class (`lib/quantum_phoenix/scheduler.ex`):

```elixir
defmodule QuantumPhoenix.Scheduler do
  use Quantum.Scheduler, otp_app: :quantum_phoenix
end
```

And include it in our Phoenix OTP application (`lib/quantum_phoenix/application.ex`):

```elixir
defmodule QuantumPhoenix.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      # other phoenix supervisors/workers
      worker(QuantumPhoenix.Scheduler, []),
    ]

    opts = [strategy: :one_for_one, name: QuantumPhoenix.Supervisor]
    Supervisor.start_link(children, opts)
  end
  # ...
end
```

We'll also create a module to handle our task in `lib/quantum_phoenix/task.ex`:

```elixir
defmodule QuantumPhoenix.Task do
  def work do
    File.write("/tmp/quantum_phoenix.txt", "#{Timex.now}", [:append])
  end
end
```

Finally, we can configure quantum in `config/config.exs`:

```elixir
config :quantum_phoenix, QuantumPhoenix.Scheduler,
  jobs: [
    phoenix_job: [
      schedule: "*/2 * * * *",
      task: {QuantumPhoenix.Task, :work, []},
    ]
  ]
```

Phoenix: Run it!
---

After we've set things up, we can start our server with `phx.server` see similar log output as we did with OTP:

```
[debug] [:nonode@nohost][Elixir.Quantum.Executor] Task for job :phoenix_job started on node :nonode@nohost
[debug] [:nonode@nohost][Elixir.Quantum.Executor] Execute started for job :phoenix_job
[debug] [:nonode@nohost][Elixir.Quantum.Executor] Execution ended for job :phoenix_job, which yielded result: :ok
```

Similar to our OTP app, we can also interact with Quantum in the mix repl:

```
iex -S mix

iex(0)> import Crontab.CronExpression
iex(1)> [debug] [:nonode@nohost][Elixir.Quantum.ExecutionBroadcaster] Adding job #Reference<0.2079463013.1644429313.228250>
iex(2)> [debug] [:nonode@nohost][Elixir.Quantum.JobBroadcaster] Adding job #Reference<0.2079463013.1644429313.228250>
```

Phoenix: Gotchas
---

Integrating Quantum into phoenix was a snap, except for a _very strange_ compiler error:

```
== Compilation error in file lib/quantum_phoenix/scheduler.ex ==
** (CompileError) lib/quantum_phoenix/scheduler.ex:2: Crontab.CronExpression.__struct__/0 is undefined, cannot expand struct Crontab.Cr
onExpression
```

The kind folks on Elixir Forum [helped me resolve](https://elixirforum.com/t/cannot-compile-quantum-with-elixir-1-6-1/12739/3) with a simple `rm -rf _build && mix compile`.  Gremlins. ¯\_(ツ)_/¯


Conclusion
---

So far I've been extremely impressed with the tooling and ecosystem around Elixir. The Erlang underpinnings can be a little complicated but there are plenty of resources available to help; most of the tools I've found come pretty close to the holy grail of "it just works."

Hopefully this helps you along in your own journey!

[quantum]: https://github.com/c-rack/quantum-elixir
[timex]: https://github.com/bitwalker/timex
[1]: https://github.com/NickTomlin/quantum_otp_example
[2]: https://github.com/NickTomlin/quantum_phoenix_example
