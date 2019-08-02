---
layout: post
title: Encoding Adventures
date: 2019-07-29 14:54 -0700
---

I've [previously talked][0] about how files are stored as binary and briefly touched on how those bits are interpreted via an encoding. In this post I'd like to dig into that process a little further, specifically focusing on [Unicode][Unicode] files encoded in [`UTF-8`](https://en.wikipedia.org/wiki/UTF-8).


Background: a very brief introduction to Unicode.
---

> Note: if you understand Unicode, or you just don't care, feel free to skip this section.

Early computers used a character set called [`ASCII`](https://en.wikipedia.org/wiki/ASCII), which used the numbers `0-127` to represent both readable (e.g. `A` and non-readable "carriage return") characters. This worked wonderfully in small, North American context, but was woefully inadequate in terms of meeting global linguistic needs. Various competing extensions to ASCII were created to handle characters from different languages, but this led to compatibility issues and confusion when exchanging text in different encodings.

[Unicode][Unicode] attempts to solve this problem by providing one giant character set for _all_ languages and fields (e.g. mathematics, or emoji). It is the current industry standard (having said that, there are still plenty of flavors of character sets in the wild for historical reasons).

Each character in Unicode is represented by a "Code Point", which is a number that can be used to represent that character, and retrieve it, from the Unicode character set. This number can be represented in 8 or 64 bits, depending on how large it is. As note earlier, ASCII is a subset of Unicode that takes up the first 256 (since it uses an extended ASCII set) code points.

See the "more information" section at the bottom for some additional resources if you are interested in knowing more. There's a lot more to be said on the subject.


Getting started
---

Let's create a simple file with some text, similar to the one in the [binary post][0]:

```
echo "hi" > hello.txt
```

And now let's take a look at how a computer sees that data:


```
$ xxd hello.txt
00000000: 6869 0a                                  hi.
```

Great! And now let's look that up in our handy [Unicode table](https://unicode-table.com).com/en/search/?q=i). We see that the [hex 68](https://unicode-table.com/en/0068/), which corresponds to `h` and [hex 69](https://unicode-table.com/en/0069/), which corresponds to `i`, is capped off by [0a](https://unicode-table.com/en/000A/) which is the [newline](https://en.wikipedia.org/wiki/Newline#Representation) character.

Now for something more interesting:


```
$ echo "🙃" > emoji.txt
$ xxd emoji.txt

00000000: f09f 9983 0a                             

# get the 
$ xxd -b emoji.txt
00000000: 11110000 10011111 10011001 10000011 00001010
```

Whoah, that's a good deal of hex and a _lot_ of bits! 

Let's plug those hex numbers (excluding the `0a` newline) into a [unicode lookup](https://unicode-table.com/en/search/?q=f09f+9983):

```
⛿ - White Flag with Horizontal Middle Black Stripe
馃 - Ideograph cakes, biscuits, pastry CJK
```

Hmm. That didn't quite go according to plan.

What is going on? Well, unfortunately, our first example `hi` benefited from the fact that `UTF8` is backward compatible with ASCII, so 8 bit ASCII character is a valid Unicode code point. Things get more complicated when we move beyond ASCII territory. 


Plane talk
---

All Unicode code points live on a "plane", which function similar to pages in a reference book; to look up our character we first need to know which plane it lives on; once we know the plane, we can plug in the codepoint to retrieve it. Our earlier `hi` example, along with a lot of "basic" language characters lives on the ["Basic multilingual plane"](https://en.wikipedia.org/wiki/Plane_(Unicode)#Basic_Multilingual_Plane). Because of this, and it's position within the ASCII portion, we could simply use the hex representation for each 8-bit character as the Unicode codepoint.

Our Emoji, however, lives on the "Supplementary Multilingual Plane". To figure out the character our hex/bits point to, we need to do some sleuthing to find the Unicode codepoint that corresponds to our bits.

Getting to the (code) point
---

Bits are just 0s and 1s unless we know how to decode them. Fortunately, we know our file is in [`UTF8`](https://en.wikipedia.org/wiki/UTF-8). `UTF8` is a variable-width encoding format, which means that characters can take up one to four bytes, which saves valuable space for smaller codepoints (e.g. ASCII). This is in contrast to a format like `UTF32` which encodes each character in 32 bits, regardless of its size; e.g. `h` becomes `0000 0000 1001 1001` instead of `1101 000`. Unfortunately, unlike UTF32, we cannot take the bits at face value and we need to do some inspection to get the codepoint they correspond to (See [this SO](https://stackoverflow.com/a/43237606/1048479) post for a detailed explanation).

The `UTF8` spec gives us an indication of how to process `UTF8` encoded bits. We will ignore the ending non-breaking space, leaving us with four bits which we can break into "signaling" portions (e.g. required by the `UTF8`) and "code bit" portions (that specify which Unicode character we are dealing with)

```
"signaling" bits| code bits
----------------|---
11110             000
10                011111
10                011001
10                000011
```

If we remove the "signaling" bits and format the code bits we get:

```
code bits
---
000 
011111 
011001
000011
```

or `000011111011001000011` which happens to be `1F643` in hex. If we look up `1F643` in a [unicode table](https://unicode-table.com/en/search/?q=1F643) we'll see a familiar upside-down smiley face. We've just cracked the code, huzzah!

Beyond `UTF8`
---

We've just covered a single encoding here but a similar principle applies to all encodings. The encoding specification tells us how to interpret bits that compose whatever input our program is handed (a file, HTTP request, or mouse click). Those pieces are the building blocks to encode/decode _anything_ we can think of. 

If you want to cut your teeth on writing your own encoder/decoder, there are plenty of specifications openly available. For example, the [png spec](https://www.w3.org/TR/2003/REC-PNG-20031110/) specifies how to marshall binary data into a PNG. Be warned that this is not always an easy task :)


Additional information
---

There is a _lot_ more to be said about Unicode, `UTF8`, and encoding in general. This article pulls from a few different sources, and if you'd like to learn more I'd suggest checking them out:

- A good [overview](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses) of why understanding Unicode is necessary
- A [step by step guide](http://kunststube.net/encoding) breaking down the encoding process
- An overview of how [Unicode text is rendered](http://behdad.org/text/) on *nix operating systems
- [Wikipedia has several UTF8 encoding examples](https://en.wikipedia.org/wiki/UTF-8#Examples).

[0][https://nick-tomlin.com/2019/07/29/practical-binary/]
[Unicode][https://home.unicode.org/]