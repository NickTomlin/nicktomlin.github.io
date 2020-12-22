---
layout: post
title: Let's Send an Html Email Using PHPmailer
date: '2012-08-31'
comments: true
external-url: null
published: true
categories:
  - php
  - html email
disqusId: 2012/08/31/using-phpmailer-for-fun-and-profit
---
<p>I recently needed to send a create a form that would send an html email with a PDF attachement. Due to some project constraints, using a service like MailChimp (which I do love oh so much) was out of the question, so I had to work a little magic of my own. Let&#8217;s go on a little journey, shall we?</p>

<h2>Email: code like it&#8217;s 1999</h2>

<p>Email is still an anomly when it comes to web standards, where the old school way of doing thing still reigns. Be not afraid, however, because are a few tools that make things quite a bit easier.</p>

<h3>For starters: HTML Boilerplate</h3>

<p>There are a lot of quirks in email markup, and the <a href="http://htmlemailboilerplate.com/">HTML Email Boilerplate</a> does a great job of setting things up. You get tweaks for the various mail cients, a style reset, and a very basic markup template.</p>

<h3>The good stuff: your design</h3>

<p>Enjoy implementing your snazzy design here, but be sure to stay within the recommended 550-650px width (Mailchimp recommends 600px, so i&#8217;d say that&#8217;s a safe bet).</p>

<p>Feel free to write you styles in the <code>&lt;style&gt;&lt;/style&gt;</code> to make things easier as you design. We&#8217;ll use Premailer later on to move them inline.</p>

<p>Images can be hosted on your website, a CDN, or you can attach them to the email with PHPmailer.</p>

<h3>Finishing things off: Premailer</h3>

<p>Now that we have our beautiful template all tabled up and ready, we want to make sure it plays nicely with as many email clients as possible. The best way that i&#8217;ve found is to use <a href="http://premailer.dialect.ca">Premailer</a>. Premailer will take your lovely html template, work some magic on it, and give you a leaner, friendler version that even picky clients like outlook (and, suprisingly, gmail) will love.</p>

<p>Save the premailer formatted html to a file in your project directory (we&#8217;ll need to reference it in our PHP script later on).</p>

<h2>Let&#8217;s Send this puppy!</h2>

<p>We are so close, but&#8230; now we actually have to send the thing. Easier said than done.</p>

<h3>MIMEs are a pain</h3>

<p>The first hurdle is getting the proper MIME headers for the various elements of our email.
We could just use PHP&#8217;s built in mail() and write our own MIME headers for all the content (which supposes that you know enough to write your own MIME headers &#8211; I don&#8217;t), but let&#8217;s take a look at how much fun that is:</p>

<figure class='code'><div class='highlight'><table><td class='gutter'><pre class='line-numbers'><span class='line-number'>1</span>
<span class='line-number'>2</span>
</pre></td><td class='code'><pre><code class='plain'><span class='line'>$body .="Content-Type: text/html; charset=\"iso-8859-1\"";
</span><span class='line'>$body .= "Content-Transfer-Encoding: 8bit";</span></code></pre></td></tr></table></div></figure>


<p>Now imagine having to set that for your attachments (which you need to open and encode properly), the html email file, and the plain text version of your email. If you get things wrong, it&#8217;s up to you to figure out the esoteric error messages of mail() and various email clients. Whooo&#8230; no thanks. That&#8217;s why we&#8217;ll use PHPmailer to do it for us.</p>

<h3>PHPMailer to the rescue</h3>

<p><a href="http://code.google.com/a/apache-extras.org/p/phpmailer/">PHPMailer</a> is an apache extra that takes a lot of the confusion out of sending emails. Just download it to your project directory, include it in your PHP file and follow the tutorial <a href="http://code.google.com/a/apache-extras.org/p/phpmailer/wiki/UsefulTutorial">here</a> or modify my script below:</p>

~~~ php
require_once(includes/phpmail.class) // or wherever you put phpmail.class

body = file_get_contents('email/htmlemail.html'); // include our formatted email

$mail->AltBody = "To view this message please use an HTML compatible email viewer, or visit http://mysite.com/emailcampaign"; // give folks who can't read HTML email something to read
$mail->SetFrom($email,$name);
$address = $email;
$mail->AddAddress($address, $name);
$mail->Subject = "Subject";
$mail->MsgHTML($body);
$mail->addAttachment("email/attachment.pdf"); // just repeat this for multiple attachments

// send statement, followed by error reporting (comment out for production)
if(!$mail->Send()) {
  echo "Mailer Error: " . $mail->ErrorInfo; // for testing
} else {
  echo 'Message sent!'; // for testing
}
~~~

<h2>The end.</h2>

<p>And there we have it, a functional workflow for an html email with some killer attachments. It&#8217;s not perfect by any means, but it has made things a lot less easier for me. Suggestions for improvement are more than welcome, just shoot me a comment.</p>

<p>Happy Emailing,<br/>
Nick</p>
