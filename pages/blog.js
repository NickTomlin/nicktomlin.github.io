import {getSortedPostsData} from "../lib/posts"
import Link from 'next/link'
import {Date} from "../components/post/Date"
import {PageLayout} from "../layouts/PageLayout"

export default function Blog ({ posts }) {
  return (
    <PageLayout>
      <div className="home">
        <h1 className="page-heading">All Posts</h1>
        <ul className="post-list">
          {posts.map(post => (
            <li>
              <Date dateString={post.date} />
              <h2>
                <Link className="post-link" href={post.href}>{post.title}</Link>
              </h2>
            </li>
          ))}
        </ul>
        <p className="rss-subscribe">subscribe <a href="/feed.xml">via RSS</a></p>
      </div>
    </PageLayout>
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

