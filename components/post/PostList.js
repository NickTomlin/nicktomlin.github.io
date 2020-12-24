import {Date} from "./Date"
import Link from "next/link"

export function PostList ({ posts }) {
  return <ul className="post-list">
    {posts.map(post => (
      <li key={post.id}>
        <Date dateString={post.date} />
        <h2>
          <Link className="post-link" href={post.href}>{post.title}</Link>
        </h2>
      </li>
    ))}
  </ul>
}
