import {Date} from "./Date"
import Link from "next/link"

export function PostList ({ posts }) {
  return <section className="post-list">
    {posts.map(post => (
      <article key={post.id} className={"my-6"}>
        <header>
          <p className={"text-2xl font-semibold"}>
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
