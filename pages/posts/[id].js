import Head from "next/head"
import Link from "next/link"
import {PostLayout} from "../../layouts/PostLayout"
import {Date} from "../../components/post/Date"
import {getAllPostIds, getPostData} from "../../lib/posts"
import { DiscussionEmbed } from 'disqus-react';
import site from "../../site.config"

export default function Post ({ postData }) {
  return (
    <PostLayout>
      <article itemScope itemType="http://schema.org/BlogPosting">
        <Head>
          <title >{postData.title}</title>
          <meta name="description" key="description" content={postData.excerpt || site.description} />
        </Head>
        <header className={"my-4"}>
          <h1 className={"lead text-5xl mb-3"} itemProp="name headline">{postData.title}</h1>
          <span>
            <Date dateString={postData.date} itemProp={"datePublished"}/>
          </span>
        </header>
        <div className="post-content prose lg:prose-xl" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <footer className={"my-10"}>
          <div >
            <Link href={"/posts"}>
              <button className={"py-1 px-4 rounded-md bg-brand-primary text-white no-underline"}>
                More posts
              </button>
            </Link>
          </div>
          {postData.comments !== false &&
            <div className={"my-4"}>
              <DiscussionEmbed
                shortname={postData.id}
                config={{
                  locale: "en_US",
                  identifier: postData.disqusId || postData.id,
                  title: postData.title
                }}
              />
            </div>
          }
        </footer>
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
