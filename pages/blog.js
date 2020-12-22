import {getSortedPostsData} from "../lib/posts"
import Link from 'next/link'
import {Date} from "../components/post/Date"

export default function ({ posts }) {
  return (
    <div className="home">
      <h1 className="page-heading">All Posts</h1>
      <ul className="post-list">
        {posts.map(post => (
          <li>
            <Date dateString={post.date} />
            <h2>
              <Link className="post-link" href={`/posts/${post.permalink}`}>{post.title}</Link>
            </h2>
          </li>
        ))}
      </ul>
      <p className="rss-subscribe">subscribe <a href="/feed.xml">via RSS</a></p>
    </div>
  )
}

export async function getStaticProps() {
  const posts = getSortedPostsData()
  return {
    props: {
      posts
    }
  }
}

