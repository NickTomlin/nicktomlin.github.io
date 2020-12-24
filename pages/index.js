import Link from "next/link"
import {DefaultLayout} from "../layouts/DefaultLayout"
import {getSortedPostsData} from "../lib/posts"
import {PostList} from "../components/post/PostList"

// need to do this... for slugs
// https://nextjs.org/docs/routing/dynamic-routes
export default function Index ({ posts }) {
  return (
    <DefaultLayout>
      <div className="home">
        <section className="text-xl tracking-tighter leading-10">
          <h1 className="page-heading">Nick Tomlin: Full Stack Engineer</h1>
        </section>
        <section className="posts">
          <PostList posts={posts.slice(0, 6)}/>
          <h3>
            <Link href={"/blog"}>All posts</Link>
          </h3>
        </section>
      </div>
    </DefaultLayout>
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

