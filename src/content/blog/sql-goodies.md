---
layout: post
title: SQL Goodies
comments: true
categories: 'sql, postgres'
date: '2016-05-18'
disqusId: /2016/05/18/sql-goodies
---

I've recently been diving into SQL ([postgres](http://www.postgresql.org/) to be exact). Here are a few random tidbits that have helped me on my journey.

## Things to read

**Don't read blogs** (except mine 😉) While there are _many_ helpful resources on the internet for learning about SQL, I've found the scattershot approach of reading blogs to be less than helpful in my own journey. They often cover only part of a subject or are too focused on a specific dialect to be truly helpful. I'm not suggesting that articles are never helpful, but that they can remove clarity when you are starting out. Longer form material is much better suited at the early stages.

To that end, I've found [Learning SQL](http://www.amazon.com/Learning-SQL-Alan-Beaulieu/dp/0596520832) to be the best comprehensive guide on SQL; it includes a sample database and exercises with each chapter that provide a great way to exercise the concepts you read. There are plenty of long-form books out there, but this was the most approachable and comprehensive for basic concepts.

SQL Joins were an initially for me, but [A visual explanation of SQL joins](https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/) helped clear up the confusion. It is the best of _many many_ posts about joins.


## Things to do

Like many things, getting more comfortable with SQL is all about actually doing things with the language.

- Play around with [SQL fiddle](http://sqlfiddle.com/) which is a great low-impact place to try out new ideas and concepts
- Use simple CTE's when you don't want/need a schema
  - This is a great low overhead way of playing around with a small set of data without the need to declare a set schema or `insert` rows.
  - In Postgres, this can be accomplished using `with`

```sql
-- postgres only, alas
WITH
  characters (id, first_name, last_name) as (
    VALUES
      (0, 'Harry', 'Potter'),
      (1, 'Ron', 'Weasley')
  ),

  wands (id, character_id, name) as (
    VALUES
    (0, 0, 'Unicorn Core'),
    (1, 1, 'Maple Core')
  )

SELECT name, first_name, last_name from wands
  INNER JOIN characters ON characters.id = wands.character_id;
```

- Use a dataset that matters to you. If you workplace provides a sanitized read-only copy of data, use it! If that doesn't spark your interest, create your own database (favorite sports tems, ninja clans, etc), or convert something from [data.gov](https://www.google.com/#q=open+data) or other data providers). I find it much easier to work with data that I have an emotional or business connection to.

## An ORM should be a jetpack, not a crutch

ORMs like ActiveRecord are fantastic, they enable teams to write easy, reusable queries without littering your code with verbose SQL. Unfortunately, this means that when you need to dip down into raw SQL or troubleshoot a SQL problem, you can be left out in the cold.

Most ORMs provide a query logging feature, or a way to translate a series of method calls into an SQL statement. In active record, this is the `to_sql` method, e.g. `MyModel.joins(:my_association).where(query: true).to_sql`. Using this can help you understand and translate complicated ORM logic into SQL to better understand what is going on under the hood.

Ensure that you understand the structure of your database by looking at it in a console (or a schema file, if your ORM provides one). Even if you are using an ORM, this will make the connections between objects much easier to visualize. It also helps demystify abstract and potentially confusing ORM concepts like [PolyMorphic Associaitons](http://guides.rubyonrails.org/association_basics.html#polymorphic-associations) when you see what they are doing under the hood.

Once you have a feel for the structure of a database, use toy projects or a throwaway branch to selectively replace ORM code with raw SQL. Many ORMs will give you an ability to mix raw SQL in with their own wrappers. E.g. ActiveRecord will allow you to `select` off of queries, or execute a raw sql statement with `ActiveRecord.base.connection.execute`. This provides a great way to gradually start using SQL without jumping in head first (if that's not your cup of tea). It's also a great way to see how an ORM may optimize (or _not_ optimize) your queries.

The more you learn about SQL (and how your ORM formats SQL) the better your code (whether raw or ormified) will be.

## Console tips

The SQL console is one of the most useful tools for learning SQL and discovering your dataset. Here are a few tricks and tips

- `explain` to see what your queries are doing under the hood
- `show tables` (or `\d` for Postgres) gives you your DB's structure
- `describe <table>` (or `\d <table>` for PG) gives you a table's structure
- `\e` in a console will open the current command in the editor of your choice. Very handy for tweaking long queries

**Postgres Only**

- `\x` Use super pretty "extended display" for outputting queries
- `\i file.sql` (PG only) executes a query from a file
- `\o output.out` writes output to `output.out` which can be great for storing the results of a query for later
