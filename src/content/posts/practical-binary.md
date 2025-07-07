---
layout: post
title: Practical Binary
date: '2019-07-29'
disqusId: /2019/07/29/practical-binary
---

I consider myself an experienced programmer, but my real-world experience is mostly in the full stack realm. I've never written a line of assembly; only written a tiny bit of `c`, and bit-shifting makes my head hurt.

 Because I wanted to learn more about general computing, I recently read [`code`][0]. The book gives an overview of computing from its 19th-century roots until the end of the 20th century, taking the time to go in-depth on the both implementation of computation _and_ its history. I'd highly recommend giving it a read if you are interested in learning more about computing.

This article provides some hands-on examples of one of the more interesting sections in [`code`][0], which deals with how a series of `0`s and `1s` is interpreted by your computer and passed on to you as something meaningful.

There are 10 types of people in the world
---

When people talk about expressing things in binary, my first impulse is to treat them like they are [joking around](https://www.convertbinary.com/joke/) or [nonsensical robots](https://www.youtube.com/watch?v=Ia9N_wZaoa4). In practice, binary data itself is quite simple once you make the initial mental shift.


### Terms

This post isn't about binary itself, but I'll briefly detail some terms before we move on:

- [`binary`](https://en.wikipedia.org/wiki/Binary_number) numbers are expressed in a base 2. If this is entirely foreign to you, I'd highly suggest reading the Wikipedia article, [`code`][0], and doing some simple decimal to binary conversions in your head.
    - Here is a simple example, for the binary number `1001` converted to a decimal one:

        ```
        1 0 0 1  =  000 00 9
        - - - -     --- -- -
        8 4 2 1  =  100 10 1
        ```

      where the our decimal (base 10) system uses positions based on the powers of `10` (1, 10, 100, 1000...), binary uses positons based on the powers of `2` (1, 2, 4, 8...)


- [`hexidecimal`](https://en.wikipedia.org/wiki/Hexadecimal) (or `hex`) It is base-16 number system that is convenient for working with binary numbers in a more human readable, space efficient manner.
    -  For example, 35 in binary is `100011` and `23` in `hex`. More importantly, the conversion between `hex` and binary can be done in groups of four without counting the "place" of each digit:
        ```
        0111  1110  0100
          ^    ^     ^
          7    E     4
        ```
        This makes it _much_ easier for humans to deal with long binary numbers.

- [`bit`](https://en.wikipedia.org/wiki/Bit): A `bit` (or binary digit) is the atomic unit of data for your computer. It consists of a single value which is either a `0` or `1`. Everything, from plain text, to an image, to the keys being pressed on your keypad, is expressed in bits.

- [`byte`](https://en.wikipedia.org/wiki/Byte): A `byte` is a series of bits, typically (but not always!) `8` bits.


Diving in
---

> Note: These examples assume you are using a *nix based OS like Mac OSX, Ubuntu, or using the <a href="https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/">Linux bash shell on windows</a>

To start on a practical note, let's create a simple file with some text:

```bash
echo "hi" > hello.txt
```

And now let's take a look at how a computer sees that data using [`xxd`](https://linux.die.net/man/1/xxd), a handy *nix tool for interacting with hex and binary representation of files:


```bash
xxd hello.txt
00000000: 6869 0a                                  hi.
```

I know I promised you `0`s and `1`s but there's actually a convenience layer between us and binary to make data simple to read. By default `xxd` outputs the `hexidecimal` (or `hex`) representation of the underlying binary file.

To get at those raw bits, we need to pass the `-b` flag to `xxd`:


```bash
xxd -b hello.txt

00000000: 01101000 01101001 00001010                             hi.
```

That's more like it. This provides a great illustration of why hex is the preferred format for binary numbers, it's a lot more concise!

We still don't know how those zeros and ones translate to `hi` though. Let's dig in.

Crack the (en)code
---

`01101000 01101001` (or `68 69` in hex) could be `hi` or it could be something entirely different based on the encoding our program is using. Some encodings (like `gif` or `pdf`) include a hint to their contents in the first few bytes, but there is no requirement that files self identify.

What's fascinating about this is that we generally rely on a suffix to files to designate how we believe they should be interpreted. The `.pdf` postfix is merely a hint (the file could be any jumble of binary, not necessarily one that makes sense to a something that reads PDFs). I remember "fixing" broken files in my college tech support days be adding back a missing `.pdf` extension that someone had accidentally removed.

### It's all about the encoding

Before we can marshall those `0`s and `1`s into something meaningful, we need to know how they were encoded so we can decode them. Most *nix operating systems will have the `file` utility, which can be used to make an educated guess as to the type and encoding of a file:

```
file hello.txt
hello.txt: text/plain; charset=us-ascii
```

Although this is a helpful hint, the only reliable way of knowing how to decode a file is knowing how that file is encoded; you can use heuristic or trial and error to find one that "seems" right but there is no surefire way to get the right encoding for an arbitrary file.

Without the correct encoding, a file is just a stream of `0`s and `1s` with endless, unrealized potential.

### Decoding

When we use a tool like `cat` or read a file in a programming language `JavaScript` or `Python` into a string, our computer uses a default encoding to interpret the bits contained within the file. On *nix machines, the `$LANG` variable contains the default system character set, which `cat`, `less`, and other tools will use (`en_US.UTF-8` in my case). These tools will use an encoding to map the bits from the file to a character in the character set. More on that now.

A character set (or charset) is a mapping of numbers to a character (e.g. `64` to  `A`). My system charset of `en_US.UTF-8` uses the [Unicode](https://home.unicode.org/) character set.

While that mapping is important, it doesn't have anything to do with those bits. We'll need to use an encoding (in this case `UTF-8`, another industry standard) to interpret those bits as numbers that can be mapped to the Unicode charset.

### Back to our file

Now that we understand the encoding we are going to use, and the charset it will map to, let's break things out onto a few lines to talk about how the ASCII and UTF8 see those bits:

```
01101000 = 104 (h in ascii and 0x68 Unicode)
01101001 = 105 (i in ascii and 0x69 Unicode)
00001010 = 9 (newline in ascii and Unicode)
```

Again, the computer just sees (and happily whirs through) a long sequence of binary: `011010000110100100001010` but it's doing the aforementioned mapping when we get to our terminal.

### But what about "binary" files?

When they say a "binary" file, what most people typically mean is something that is not a "plain" ASCII/UTF8 file like `hello.txt` or `example.csv`. If we `cat example.csv` or `hello.txt`, we'll get an accurate representation of the file's contents, but if we run `head example.pdf` we get something very different:


```binary
%PDF-1.4
%äüöß
2 0 obj
<</Length 3 0 R/Filter/FlateDecode>>
stream
x=
1
²Gv~߷d{r"X
^YAS!0XrbVhl8(OvN3J$oz
                      6w$ɝjOQNf˒(
```

Things go well when we are dealing with UTF-8 sequences like `%PDF-1.4` (which includes ASCII, as we found out earlier) but quickly get crazy when the encoding that `head` is trying to use dutifully maps the bits in the file to "nonsense" characters (the bits in the file are numbers that map to valid Unicode characters, but they have no real meaning).

This is the same as if you attempted to `cat` an executable file, a video, or anything else that uses non "text" or human readable encoding.

A program that is capable of working with [PDF encoding](https://www.adobe.com/content/dam/acom/en/devnet/pdf/pdfs/PDF32000_2008.pdf) (warning, the PDF spec is _huge_) would know how to properly interpret each section of bytes to display a PDF to a user.

Where do bits come from?
---

We've been working with data stored on a computer drive, but i'd like to make a quick note about the storage of binary data. Because of the simplicity of the format, humans have used numerous ingenious methods to story binary data, even before modern computers existed. These include [punch cards](https://en.wikipedia.org/wiki/Punched_card), [tapes](https://en.wikipedia.org/wiki/Tape_drive), and [electrons](https://en.wikipedia.org/wiki/Flash_memory) to name a few. While the mechanics of most storage methods are beyond my expertise, each method is simply a collection of `0`s and `1s`. 

The simplicity of that abstraction is one of the beauties of binary data: a program doesn't have to care that the data comes from a tape drive, a piece of paper, or a [steampunk flash drive](https://www.amazon.com/Slavatech-Handmade-Pentode-Steampunk-Industrial/dp/B00NB0QYDI), it just needs to know how to handle a stream of data. 

Conclusion
---

While working with individual bits is far removed from my day to day as a programmer, grasping the fundamentals of how a computer works with data is a great way of better understanding the systems that I depend on to get my work done. It's also useful in understanding the different [layers](https://en.wikipedia.org/wiki/OSI_model) of data, and understanding vital concepts like encoding. [`01100011 01101000 01100101 01100101 01110010 01110011`](https://onlineutf8tools.com/convert-binary-to-utf8?input=01100011%2001101000%2001100101%2001100101%2001110010%2001110011)!


[0]: https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0735611319
