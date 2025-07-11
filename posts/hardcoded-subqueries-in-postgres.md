---
layout: post
title: Hardcoded sub queries in Postgres
comments: true
categories: 'sql, postgres'
date: '2016-05-22'
---

I recently ran into an issue where I needed to write an `IN` filter that consumed values from a sub query and hard-coded list.  While I could express this relatively elegantly using an ORM to run the subquery and append the results to an array of hardcoded strings, I was struggling with how to do so raw SQL query.

My first attempt was to use `WITH` and a simple CTE:

```sql
WITH hardcoded_user_ids(id) as (
  VALUES (1), (2)
)

SELECT * FROM orders
WHERE orders.user_id IN (
  SELECT id from normal_users
  UNION ALL
  SELECT id FROM hardcoded_user_ids
);
```

This was fine, but the CTE felt a bit verbose and unnecessary for my purposes. After some experimentation, I realized that this is possible using `AS` and specifying the column name:

```sql
SELECT * FROM orders
WHERE orders.user_id IN (
  SELECT id FROM normal_users
  UNION ALL
  SELECT id from (
    values (1) (2)
  ) as hardcoded_user_ids(id)
)
```

While the CTE route may actually be clearer in the long run, I like the formatting of the inline values list for simple one offs.
