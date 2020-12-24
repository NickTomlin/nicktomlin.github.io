import {getSortedPostsData} from "../lib/posts"
import {PageLayout} from "../layouts/PageLayout"
import {PostList} from "../components/post/PostList"

export default function Blog ({ posts }) {
  return (
    <PageLayout>
      <div className="home">
        <h1 className="page-heading">All Posts</h1>
        <PostList posts={posts}/>
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

