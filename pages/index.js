import Link from "next/link"
import {DefaultLayout} from "../layouts/DefaultLayout"
import {getSortedPostsData} from "../lib/posts"
import {PostList} from "../components/post/PostList"
import {SocialLinks} from "../components/SocialLinks"

export default function Index ({ posts }) {
  return (
    <DefaultLayout>
      <section className={"mb-2 flex flex-col items-center md:flex-row md:mb-4 lg:my-16"}>
        <picture>
          <img
            className={"my-face"}
            sizes="(max-width: 1200px) 100vw, 1200px"
            srcset="
/images/headshot_uaj0dm_c_scale,w_190.jpg 190w,
/images/headshot_uaj0dm_c_scale,w_373.jpg 373w,
/images/headshot_uaj0dm_c_scale,w_508.jpg 508w,
/images/headshot_uaj0dm_c_scale,w_624.jpg 624w"
            src="/images/headshot_uaj0dm_c_scale,w_373.jpg"
            alt="Nick Tomlin - Headshot" />
        </picture>
        <article className={"text-center"}>
          <h1 className="my-name text-6xl lead tracking-wide mb-2 lg:text-8xl">Nick Tomlin</h1>
          <h2 className={"text-3xl mb-2 lg:text-5xl"} >Full Stack Engineer</h2>
          <h3 className={"text-xl lg:text3xl"}>
            From an idea, to production, and beyond.
          </h3>
          <div className={"grid grid-cols-2 gap-4 md:grid-cols-none md:flex my-6 md:my-3 transition-colors lg:text-xl"}>
            <SocialLinks />
          </div>
        </article>
      </section>

      <section className={"mb-2 flex flex-col md:flex-row md:mb-4 lg:my-16"}>
        <article className={"mb-8"}>
          <h1 className="decorated-heading font-semibold text-3xl lead tracking-wide">Latest Posts</h1>
          <PostList
            posts={posts.slice(0, 4)}
          />
          <p className={"text-secondary text-md underline"}>
            <Link href={"/posts"}>
              <button className={"py-1 px-4 rounded-md bg-brand-primary text-white no-underline"}>
                All posts
              </button>
            </Link>
          </p>
        </article>
      </section>
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

