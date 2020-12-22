import Head from "next/head"
import {PostLayout} from "../../../../../layouts/PostLayout"
import {Date} from "../../../../../components/post/Date"
import {getAllPostIds, getPostData} from "../../../../../lib/posts"

export default function Post ({  postData }) {
  return (
    <PostLayout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={""}>{postData.title}</h1>
        <div className={""}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </PostLayout>
  )
}

export async function getStaticPaths () {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
const postData = await getPostData(params)
  return {
    props: {
      postData
    }
  }
}
