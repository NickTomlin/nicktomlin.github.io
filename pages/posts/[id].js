import Head from "next/head"
import {PostLayout} from "../../layouts/PostLayout"
import {Date} from "../../components/post/Date"
import {getAllPostIds, getPostData} from "../../lib/posts"
import { DiscussionEmbed } from 'disqus-react';
import site from "../../site.config"

export default function Post ({ postData }) {
  return (
    <PostLayout>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" key="description" content={postData.excerpt || site.description} />
      </Head>
      <article className="post" itemScope itemType="http://schema.org/BlogPosting">
        <header className="post-header">
          <h1 className="post-title" itemProp="name headline">{postData.title}</h1>
          <p className="post-meta">
            <Date dateString={postData.date} itemProp={"datePublished"}/>
          </p>
        </header>
        <div className="post-content" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      {postData.comments !== false &&
        <DiscussionEmbed
          shortname={postData.id}
          config={{
            identifier: postData.disqusId || postData.id,
            title: postData.title
          }}
        />
      }
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
