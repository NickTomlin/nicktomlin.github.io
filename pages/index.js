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
        <section>
          <h1 className="text-4xl lead font-semibold tracking-wide">Nick Tomlin: Full Stack Engineer</h1>
        </section>
        <section className="posts">
          <PostList posts={posts.slice(0, 6)}/>
          <p className={"text-blue-500 text-md underline"}>
            <Link href={"/blog"}>All posts</Link>
          </p>
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

