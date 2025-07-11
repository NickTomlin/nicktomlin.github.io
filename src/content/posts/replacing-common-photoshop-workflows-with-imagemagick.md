---
title: Replacing Common Photoshop workflows with ImageMagick
date: '2013-03-16'
comments: true
published: true
external-url: null
categories: null
---
Photoshop is a wonderful tool, but it tends to require mousing (even with shortcuts), likes to eat up as much RAM as possible, and doesn't play nice with bash scripts. Thats why I prefer [Image Magick](http://www.imagemagick.org/script/index.php): a quirky, insanely full-featured CLI image manipulation library. I'll run through some examples of using it do a few common tasks that I previously used photoshop for, such as:

- Identify the size/type of image
- Convert image types
- Resize images to a maximum width/height
- Reduce image filesize
- Trim Whitespace
- Create new images from scratch
- Add borders


<strong>Example Repository</strong>

If you want to follow along, i've created an [example repository](https://bitbucket.org/nicktomlin/imagemagick-examples/) with some source files. I'll be referencing them through the post.

## Installation

### Mac Os X
Mac users can (and should) use [brew](http://mxcl.github.com/homebrew/) :

``
brew install imagemagick
``
### Linux

Most linux distributions should have the ``imagemagick`` package available by default.

For Ubuntu:

``apt-get install imagemagick``

## There be dragons: Mogrify Vs. Convert
One important thing to cover before we start slicing and dicing images is that IM has two  major methods for manipulating images: ``convert`` and ``mogrify``. ``Convert`` takes a source file, makes whatever changes you desire to it and ouptus them to a file you specify. ``Mogrify`` only accepts one file, and makes all changes on that file (unless you specify a destination directory). ``mogrify`` has a simpler syntax for performing batch operations on images, but that elegance comes with the potential of deleting precious content. There's an example of how to handle batch operations using both commands in the "resize" section later on. For now, just be warned that ``mogrify`` will write any changes you make to the __original__ files. Back up early; back up often.

## [Identify](http://www.imagemagick.org/script/command-line-options.php#identify) the size and type of images
``identify`` is great for getting a quick overview of an image's properties.

Our example's source file includes an image file named ``300``, which i've nabbed from [PlaceKitten](http://placekitten.com/). Photoshop doesn't know what to do with the image, because it is missing an extension, and while we could try and guess the extension by renaming the file to (gif|png|jpg) and seeing what happens, but it's cooler (and faster) to use the ``identify`` command to figure things out:

~~~ shell
identify 300
300 JPEG 200x200 200x200+0+0 8-bit sRGB 8KB 0.000u 0:00.009
~~~

Ah, a jpeg. I suspected it all along.

### Formatting identify's output
The default output of the ``identify`` command is a little verbose for my taste. We can trim it down by using IM built in ``-format`` [escapes](http://www.imagemagick.org/script/escape.php)

<pre><code> # Print the name, and dimensions of the file named 300
  identify -format "Name: %f Dimensions: %P Type: %m" 300 </code></pre>

Batch identification is simple with your shell's built in [globbing](http://wiki.bash-hackers.org/syntax/expansion/globs):

<pre><code>
  # '*' will get you more than you ask for, so it's best to narrow
  # things down based on the file structure you are dealing with
  identify *</code></pre>
## Convert image formats
Imagemagick's powerhouse is the [``convert``](http://www.imagemagick.org/script/convert.php) command. You can use it to do almost anything you can imagine through some terrifyingly complex flags. We'll try to keep things simple : )

### Convert from ``tiff`` to ``jpg``

Image magick can effortlessly convert images between various formats. A problem one of my coworkers ran into recently involved clients needing images in the ``tiff`` format. Photoshop can do batch operations, but the process is clunky, and — in my experience— unreliable.

#### Single Images:
- ``convert convert.tiff kitten.jpg`` Simple, no?

#### Multiple Images:
- destroying the original image:
  - ``mogrify`` ``mogrify --format tiff *.jpg``
- retaining the original image, the ``mogrify`` command can be used with the ``-path`` flag
  - ``mogrify --format tiff -path converted *.jpg``
  - The path (in this case the 'converted' directory) must exist, or IM will complain
  - Make sure that this path is different than the files you are using ``mogrify`` on, or they will be overwritten.
- retaining the original image, you can use  a long``convert`` statement (see batch resizing below).

## Resize images

### Simple Resize

``convert kitten.jpg -resize 80% resized-kitten.jpg``

### Batch Resizing

Clients rarely have a images in a uniform, web-optimized format, and even if they do I usually need need two copies: retina-ready images, and images for us normal folks. ImageMagick makes generating those a snap.

In our ``resize/batch`` folder:

``convert *.jpg -resize 80% -set filename:f '%t@2x' '%[filename:f].jpg'``

Here we are resizing all jpg images by 80%, setting the filename the filename ``%t`` plus the string ``@2x`` to follow apple's convention for retina images, and then outputting the file. The syntax is a little esoteric (more details on that [here](http://www.imagemagick.org/Usage/files/#save_escapes)), but once you get the hang of it it can be quite useful.

We can now run ``mogrify !(*@2x).jpg -resize 40%`` to cut the non retina images down to size (note, this will "destroy" the original images -- I have a backup handy).

### Resizing to a maximum pixel width
If you have do not have a specific size for your images, but want to keep things small, you can use the following syntax:

In our ``resize`` folder, there is a max width image. Running identify gives us the following:

``max-width.jpg JPEG 408x287 408x287+0+0 8-bit sRGB 15.8KB 0.000u 0:00.000``

Let's resize that to a max width of 200px:

``convert max-width.jpg -resize 200\> max-width-resized.jpg``

One special thing to note is the icky need for the ``\`` in ``\>``. This is necessary to escape to prevent your shell from interpreting that as an output redirection ``>``.

### Replacing "save-for-web" and reducing file size with ``-strip``

When resizing images (especially large images), you may notice that the file size of the images does not decrease as much as you might expect. This is typically due  the meta-data and other kruft that may come attached to your image file. Using the ``-strip`` flag on any IM operation will remove this data, which, in my experience, typically results in a 10-30% reduction in size.

In our ``trim`` folder:
``convert -strip strip.jpg stripped.jpg``

Use ``identify`` to compare the file sizes. Not a huge reduction (this image is pretty slim already), but imagine those percentage savings being applied to a larger image.

Obviously, Photoshop's "Save for web" combines resizing and optimizing functions, but you can too.


```
convert sample.png -strip -resize 80% optimized.png
```

## Borders
Add a 5px black border to an image.

In our ``borders`` folder:

``convert kitten.jpg -bordercolor '#000' -border 5 bordered.jpg``

## Trim Whitespace

My jaw dropped when I first found out about this command (thanks to [this](http://hilbertastronaut.blogspot.com/2008/08/imagemagick-crops-your-white-space.html) brilliant gentleman)

In our ``trim-whitespace`` folder

``convert trim.png -trim trimmed.png``

Unfortunately, for images with gradients, or subtle transitions between subject/background, the results are not quite as spectacular:

``convert not-quite-trim.jpg -trim not-quite-trimmed.jpg``

Will output an image that still has a background bleed :(

## Create Images from the command line
Imagemagick can also help you with bespoke iamges as well, if you need some filler content and can't use a service like placehold.it or (my favorite) placekitten.com.

To create a simple gray (usinga hex value), sized 100x100 you can use the convert command.

- Solid Color:
  ``convert -size 100x100 canvas:#a19c9e canvas.png``
  (note, you may need to quote/escape hex colors, as your shell may try glob them)

- Gradient:
  ``convert -size 100x100 gradient:#a19c9e-#000000 canvas.png``

- Pattern:
  ``convert -size 100x100 pattern:HEXAGONS canvas.png``

There are a host of options [here](http://www.imagemagick.org/script/formats.php)

## The start of a beautiful friendship
Hopefully these examples have whet your appetite for handling images on the command line. IM can do so so much more, and all those features are listed in
IM's [extensive documentation](http://www.imagemagick.org/script/command-line-processing.php#sequence).

## Notes

### Os X Users: ``sips``
If you don't want to bother installing IM, or you are on a friend's Macbook and can't. Use the built-in utility ``sips`` to do some batch image processing. While not as robust as ImageMagick, it suffice in a pinch. More on that [here](https://developer.apple.com/library/mac/#documentation/Darwin/Reference/ManPages/man1/sips.1.html).

### IM and Build Processes
While IM is an excellent choice for performing large batch operations on images, it has been my experience that it is better suited for one off batch jobs than a constant build/deploy process. I'd suggest using tools like the [HTML5 BoilerPlate Build script](https://github.com/h5bp/ant-build-script) or [Grunt](http://gruntjs.com/) with the [grunt-contrib-imgmin](https://github.com/gruntjs/grunt-contrib-imagemin) plugin on projects that may need to consistently run and rerun optimization.

### A note on Performance
ImageMagick has a more performant fork [GraphicsMagick](http://www.graphicsmagick.org/benchmarks.html) if you are concerned about keeping resource usage down or if you are [etsy](http://codeascraft.etsy.com/2010/07/09/batch-processing-millions-of-images/). Most of the commands are similar, but the differences between the command structure and GM's elusive api documentation make starting with imageMagick a better fit. You can always move on to GM when performance becomes a concern.

## Corrections
If you are a command-line master, and i've missed something or missed a performant shortcut, don't hesitate to note it in the comments. Or open an [issue](https://bitbucket.org/nicktomlin/imagemagick-examples/issues?status=new&status=open)

