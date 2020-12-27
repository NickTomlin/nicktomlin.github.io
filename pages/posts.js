import {getSortedPostsData} from "../lib/posts"
import {PageLayout} from "../layouts/PageLayout"
import {PostList} from "../components/post/PostList"

export default function Posts ({ posts }) {
  return (
    <PageLayout>
      <h1 className="lead text-5xl mb-3">Posts</h1>
      <PostList posts={posts}/>
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

