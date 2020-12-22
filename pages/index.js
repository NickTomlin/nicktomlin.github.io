import Link from "next/link"
import {DefaultLayout} from "../layouts/DefaultLayout"
import {Date} from "../components/post/Date"
import {getSortedPostsData} from "../lib/posts"

// need to do this... for slugs
// https://nextjs.org/docs/routing/dynamic-routes

export default function Index ({ posts }) {
  return <DefaultLayout>
    <div className="home">
      <section className="hero">
        <h1 className="page-heading">Nick Tomlin: Full Stack Engineer</h1>
      </section>
      <section className="posts">
        <ul className="post-list">
          {posts.map(post => {
            const href = {
              pathname: '/posts/[year]/[month]/[day]/[title]',
              query: {
                ...post.slug
              }
            }
            return (
              <li key={post.id}>
                {console.log(post.date)}
                <Date dateString={post.date} />
                <h4>
                  <Link className="post-link" href={href}>{post.title}</Link>
                </h4>
              </li>
              )
          })}
        </ul>

        <h3>
          <Link href={"/blog"}>All posts</Link>
        </h3>
      </section>
    </div>
  </DefaultLayout>
}

export async function getStaticProps() {
  const posts = getSortedPostsData()
  return {
    props: {
      posts
    }
  }
}

