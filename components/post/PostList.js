import {Date} from "./Date"
import Link from "next/link"
import clsx from "clsx"

export function PostList ({ posts, className, postTitleClassname }) {
  return <section className={className}>
    {posts.map(post => (
      <article key={post.id} className={"my-6"}>
        <header>
          <p className={clsx("text-xl font-semibold", postTitleClassname)}>
            <Link className="text-lg" href={post.href}>{post.title}</Link>
          </p>
        </header>
        <footer>
          <p className={"text-lg"}>
            <Date dateString={post.date} />
          </p>
        </footer>
      </article>
    ))}
  </section>
}
