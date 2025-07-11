---
title: A command line manifesto
date: '2012-08-10'
comments: true
external-url: null
categories: Terminal
---
<small>Note:
I will be using "terminal" and "the command line" interchangeably. If there's better language to use, drop me a comment and I will change things around.
</small>

My first experience with the command line was trying to play Wolfenstein 3D in windows 3.1. It was off-putting, a little scary, and I viewed the experience as a painful -- but necessary -- hurdle on the road to fun. From conversations i've had with others, this is not an uncommon perspective on terminal in the front-end community.

I felt the same until my stint as the IT admin/developer/sysadmin for a non-profit. I found myself developing on several servers of varying Linux flavors and, since some of these boxes were headless, I found myself having to break open the command line. My initial reaction to doing everything on the command line was terror but now, I try to do as much as I can on the command line.

Here's why:

### Speed
Things are just faster on the command line.
Consider the following:

#### Workflow: Installing wordpress

##### GUI
1. Download www.wordpress.org/latest.zip in your browser
2. Find and unzip the files on your local machine
3. Log into your site via FTP
4. Upload the files via FTP
5. Make a sandwich
6. Run setup

##### Command Line (via ssh)

~~~ shell
wget www.wordpress.org/latest.zip
unzip latest.zip
# run setup / or nano config file
~~~

Not only does the command line version get things done 2 lines (possibly one, if you have more command-fu than I do), but it does also it significantly faster by removing the local machine from the process. Waiting for 500+ files to transfer one by one via FTP is no fun.

Things are even better for Drupal, using [drush](http://drupal.org/project/drush/), but I won't go into detail about that here.

### Simplicity
I work in Mac Os X, which is based on Unix, and all of the sites work in a LAMP (Linux/apache/mysql/php) environment, so I find it pretty natural moving between the server and my local machine. This means tricks I pick up locally work remotely, and vice versa.

In addition, It's quite helpful to be familiar with the environment where the things I make are going to live. If something doesn't go according to plan on the server, I know some basic things to try, and I can give a lot more informed report to my sysadmin if I need help.

Finally, if you use SASS, LESS, or GIT you can run those from terminal without having to buy a gui app (however [nice](http://incident57.com/codekit/)). All those new tools fit harmoniously into the same environment you are used to without any added overhead/app funkiness.

### Extensibility
One of my initial frustrations with working on the command line was the sheer amount of time it took to get around. The shortcuts that i'd relied on (liking dragging a folder into "favorites") were gone. While customizing things is not the most intuitive process initially, you really can have things formatted however you like, and do some crazy stuff you could never do with a GUI. I'd never go back now, simply because I wouldn't have the same options that I do on the command line.

A few customizations i've found helpful:

1. Open files in Photoshop

	I created a ``shop`` alias, so I don't have to leave the command line and hunt through finder. For example, I can open all the transparent .png files for my home page with: ``shop images/home-*.png``

2. Open files in my text editor from the command line

	A simple ``subl .`` and an entire directory opens up as a project, or ``subl *.php`` and i've opened all php files.

3. Use [bashmarks](http://www.huyng.com/projects/bashmarks/) to get around *fast*

	I use ``s sites`` to book mark my sites directory. Then, ``g sites`` gets me back.


This is just scratching the surface of what you can do; these were all simple to set up and I use most of them everyday. Pretty fantastic if you find yourself repeating some common tasks.


## No pressure
All that said, the beauty of the command line is that you can use as much or as little as you want. If you find that it saves you time to deploy via the command line, but you prefer to do everything else via a GUI, then that's more than fine. I think the most important thing is to not be afraid of the command line -- or at least know what you are afraid of. I still do a lot of things the "old fashioned" way, but I have found the command line to be a helpful addition to my toolkit. Hopefully it will do the same for you : )

Happy coding,
Nick
